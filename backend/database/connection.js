const mongoose=require('mongoose')
  async function connectDB() {
  await mongoose.connect('mongodb://localhost:27017/').then(
    () => {
      console.log("Db connected successfully")
    },
    (error) => {
      console.log("Error occured", error)
    }
  )
}

module.exports=connectDB