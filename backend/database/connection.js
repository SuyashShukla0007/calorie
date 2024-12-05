const mongoose=require('mongoose')
  async function connectDB() {
  await mongoose.connect(process.env.MongoUrl).then(
    () => {
      console.log("Db connected successfully")
    },
    (error) => {
      console.log("Error occured", error)
    }
  )
}

module.exports=connectDB
