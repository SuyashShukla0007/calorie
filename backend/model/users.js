const mongoose =require('mongoose')



const foodEntrySchema = mongoose.Schema({
  date: { type: String, required: true },
  food: {
      Breakfast: [{ type: String }],
      Lunch: [{ type: String }],
      Dinner: [{ type: String }],
      Snacks: [{ type: String }]
  }
});

const CalorieSchema=  mongoose.Schema({
  date: { type: String, required: true },
  calories:{type:Number}
})


const userSchema=mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age:{type:Number},
  height:{type:Number,required:true},
  weight:{type:Number,required:true},
  phone: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  calories:{type:CalorieSchema},
  food: {type:foodEntrySchema},
})

const model=mongoose.model("user",userSchema)

module.exports=model