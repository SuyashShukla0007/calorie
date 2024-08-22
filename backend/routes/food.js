const express=require('express')
const {addTodayDiet,addFood,getFood,getCalories}=require('../controller/food')
const foodRouter=express.Router()

foodRouter.get('/meal',addTodayDiet)
foodRouter.post('/meal',addFood)
foodRouter.get('/meal/foods',getFood)
foodRouter.get('/meal/calorie',getCalories)
module.exports=foodRouter

