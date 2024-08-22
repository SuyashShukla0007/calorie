const mongoose=require('mongoose')
  async function connectDB() {
  await mongoose.connect('mongodb+srv://123103079:PwB5tnnu0MS67Jz5@cluster0.u9ece.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(
    () => {
      console.log("Db connected successfully")
    },
    (error) => {
      console.log("Error occured", error)
    }
  )
}

module.exports=connectDB
