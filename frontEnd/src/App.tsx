// @ts-ignore
import React from 'react';
import './App.css'
import Sign from './pages/Sign';
import News from './pages/News';
import Navbar from './components/Navbar';
// @ts-ignore
import Card from './components/Card';
import { Routes, Route } from 'react-router-dom';
// @ts-ignore
import BarChart from './components/Chart/Bar'
// @ts-ignore
import MealCard from './components/MealCard';
import Bmi from './pages/Bmi';
// @ts-ignore
import SuccessAlert from './components/accessories/SuccessAlert';
import Calorie from './pages/Calorie';
import Meals from './pages/Meals';
import CalorieCalculator from './components/IdealCalorie';
import IdealWeight from './components/IdealWeight';
import Login from './pages/Login';
const App = () => {
  return (
    
    <Routes >
      <Route  path="/news" element={
        <div className='flex'>

        <Navbar />
        <News />
        </div>} /> {/* Render Navbar on all routes */}
     
      <Route path="/dash" element={
        <div className=' flex '>
        <Navbar/>
        <div className='w-[300px]'>
        <Calorie />
        </div>
        </div>
        } />

        <Route path='/meals' element={
          <div className=' flex '>
          <Navbar/>
          <div className='w-[300px]'>
          <Meals />
       
          </div>
          </div>
          }></Route>

<Route path='/login' element={<Login/>}></Route>
        <Route path='/' element={<Sign/>}></Route>

        <Route path='/tools' element={
          <div className='flex '>
          <Navbar/>


          <div className='h-[30%] mt-[15%]  ml-[5%]'>
          <Bmi/>
          </div>

          <div className='h-[30%] mt-[12%]  ml-[6%]'>
            <IdealWeight/>
          </div>

          <div className='h-[30%] mt-[4%] ml-[6%]'>
          <CalorieCalculator/>
          </div>
          
          </div>
        }/>
    </Routes>
  );
}

export default App;