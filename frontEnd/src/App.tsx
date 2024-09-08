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
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Landing from './pages/Landing';

const App = () => {

const navigate=useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('auth');
    if (token && (window.location.pathname === '/login' || window.location.pathname === '/')) {
      console.log("Token found, redirecting from login/signup...");
      navigate('/meals');
    }
  }, [navigate]);
  
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
  <Route path='/' element={<Landing/>}></Route>
<Route path='/login' element={<Login/>}></Route>
        <Route path='/sign' element={<Sign/>}></Route>

        <Route path='/tools' element={
          <div className='flex '>
          <Navbar/>

          <div className="grid ml-[3vw] lg:ml-[10vh]  grid-cols-1 md:grid-cols-3 gap-4">
  <div className="h-[30%] mt-[28vh] ">
    <Bmi />
  </div>

  <div className="h-[30%] mt-[20vh] ">
    <IdealWeight />
  </div>

  <div className="h-[30%] mt-[10vh] ">
    <CalorieCalculator />
  </div>
</div>

          </div>
        }/>
    </Routes>
  );
}

export default App;
