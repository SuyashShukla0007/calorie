const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../model/users');


const addTodayDiet = async (req, res) => {
  try {
    // Retrieve token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send('Authorization header missing');
    }

    const token = authHeader.split(' ')[1];
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: userData.email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const db = mongoose.connection.db;
    const userCollection = user.email;

    const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd format

    const existingDiet = await db.collection(userCollection).findOne({ date: today });

    if (existingDiet) {
      return res.status(400).send('Diet document already exists for today');
    }

    const dietDoc = {
      date: today,
      Breakfast: [],
      Lunch: [],
      Snacks: [],
      Dinner: [],
      totalCalories: 0,
      totalProtein: 0,
      totalCarbohydrates: 0,
      totalFat: 0
    };

    await db.collection(userCollection).insertOne(dietDoc);

    res.status(201).send('Diet document created successfully');
  } catch (error) {
    console.error('Error creating diet document:', error);
    res.status(500).send('An error occurred');
  }
};


const getCalories = async (req, res) => {
  try {
    // Retrieve token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send('Authorization header missing');
    }

    const token = authHeader.split(' ')[1];
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: userData.email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const db = mongoose.connection.db;
    const userCollection = user.email;

    const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd format

    const dietDoc = await db.collection(userCollection).find({}).toArray();

    if (!dietDoc) {
      return res.status(404).send('No diet document found for today');
    }

    const dietSummaryArray = dietDoc.map((diet) => {
      return {
        date: diet.date,
        totalCalories: diet.totalCalories,
        totalProtein: diet.totalProtein,
        totalCarbohydrates: diet.totalCarbohydrates,
        totalFat: diet.totalFat
      };
    });

    console.log(dietSummaryArray);
    res.status(200).json(dietSummaryArray);
  } catch (error) {
    console.error('Error getting calorie data:', error);
    res.status(500).send('An error occurred');
  }
};



const setCalories = async (food, type, quantity) => {
  const db = mongoose.connection.db;
  const collection = db.collection(type);

  console.log(collection.collectionName);

  // Find the document by _id (you should replace it with the actual _id if needed)
  const document = await collection.findOne({});
  
  // Check if the document is found
  if (!document) {
    console.error(`Document not found in collection ${type}`);
    return 0;
  }

  // Access the food item in the document
  const foodData = document[food];
  console.log(foodData); // Log the food data retrieved from the document

  if (!foodData) {
    console.error(`Food item ${food} not found in document`);
    return 0;
  }

  var calories = 0;
  const quantityValue = parseInt(quantity.split(" ")[0]);

  if (isNaN(quantityValue)) {
    console.error('Invalid quantity format');
    return 0;
  }

  // Determine calories based on quantity
  var protein = 0;
  var carbohydrates = 0;
  var fat = 0;
  
  if (type === 'Beverages') {
    calories = (quantityValue / 100.0) * foodData.per_100ml.calories;
    protein = (quantityValue / 100.0) * foodData.per_100ml.protein;
    carbohydrates = (quantityValue / 100.0) * foodData.per_100ml.carbohydrates;
    fat = (quantityValue / 100.0) * foodData.per_100ml.fat;
  } else if (type === 'Dish') {
    calories = quantityValue * foodData.calories;
    protein = quantityValue * foodData.protein;
    carbohydrates = quantityValue * foodData.carbohydrates;
    fat = quantityValue * foodData.fat;
  } else if (type === 'Sweet') {
    calories = quantityValue * foodData.nutritional_info.calories;
    protein = quantityValue * foodData.nutritional_info.protein;
    carbohydrates = quantityValue * foodData.nutritional_info.carbohydrates;
    fat = quantityValue * foodData.nutritional_info.fat;
  } else if (type === 'Fruit') {
    calories = quantityValue * foodData.nutritional_info.calories;
    protein = quantityValue * foodData.nutritional_info.protein;
    carbohydrates = quantityValue * foodData.nutritional_info.carbohydrates;
    fat = quantityValue * foodData.nutritional_info.fat;
  }
  
  // Output or further processing
  console.log(`Calories: ${calories}, Protein: ${protein}, Carbohydrates: ${carbohydrates}, Fat: ${fat}`);
  
  
  
  return {calories,protein,carbohydrates,fat};
};



const addFood = async (req, res) => {
  try {
    // Retrieve token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send('Authorization header missing');
    }

    const token = authHeader.split(' ')[1];
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: userData.email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const db = mongoose.connection.db;
    const userCollection = user.email;

    const { food, meal, type, quantity } = req.body;

    const foodItem = {
      Food: food,
      Meal: meal,
      type: type,
      quantity: quantity
    };

    // Ensure the document for today exists or create a new one
    const today = new Date().toISOString().split('T')[0];
    const dietDoc = {
      date: today,
      Breakfast: [],
      Lunch: [],
      Snacks: [],
      Dinner: [],
      totalCalories: 0,
      totalProtein: 0,
      totalCarbohydrates: 0,
      totalFat: 0
    };

    console.log(`Updating collection: ${userCollection} for date: ${today}`);

    await db.collection(userCollection).updateOne(
      { date: today },
      { $setOnInsert: dietDoc },
      { upsert: true }
    );

    // Calculate calories using the function
    const { calories, protein, carbohydrates, fat } = await setCalories(food, type, quantity);
    console.log(`Calories for ${food}: ${calories} Protein: ${protein}, Carbohydrates: ${carbohydrates}, Fat: ${fat}`);

    // Add the food item to the specified meal and update totalCalories
    const updateResult = await db.collection(userCollection).updateOne(
      { date: today },
      {
        $push: { [meal]: foodItem },
        $inc: {
          totalCalories: calories,
          totalProtein: protein,
          totalCarbohydrates: carbohydrates,
          totalFat: fat
        }
      }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(400).send('Failed to add food item');
    }

    res.status(200).send('Food item added successfully');
  } catch (error) {
    console.error('Error adding food item:', error);
    res.status(500).send('An error occurred');
  }
};


const getFood = async (req, res) => {
  try {
    // Retrieve token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send('Authorization header missing');
    }

    const token = authHeader.split(' ')[1];
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: userData.email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const db = mongoose.connection.db;
    const userCollection = user.email;

    const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd format

    const dietDoc = await db.collection(userCollection).findOne({ date: today });

    if (!dietDoc) {
      return res.status(404).send('No diet document found for today');
    }

    res.status(200).json({
      Breakfast: dietDoc.Breakfast,
      Lunch: dietDoc.Lunch,
      Snacks: dietDoc.Snacks,
      Dinner: dietDoc.Dinner
    });
  } catch (error) {
    console.error('Error getting food data:', error);
    res.status(500).send('An error occurred');
  }
};




module.exports = { addTodayDiet, addFood, getFood ,getCalories};

