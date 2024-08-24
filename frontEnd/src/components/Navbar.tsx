// @ts-ignore
import React, { useState, useEffect } from 'react';
import img from '../assets/logo.avif'; // Ensure this path is correct
import { Link } from "react-router-dom";
import axios from 'axios';

const Navbar = () => {
  
  const [path, setPath] = useState<string>('');

  useEffect(() => {
    const handlePathChange = () => {
      const lastPart = window.location.pathname.split('/').pop() || '';
      setPath(lastPart);
    };

    handlePathChange();
    window.addEventListener('popstate', handlePathChange);

    return () => {
      window.removeEventListener('popstate', handlePathChange);
    };
  }, [window.location.href]);

  const handleMeals = async () => {
    const token=localStorage.getItem('auth');
    // @ts-ignore
    const res = await axios.get('https://calorie-cugj.vercel.app/api/meal',{ 
      headers:{'Authorization':`Bearer ${token}`},
      withCredentials: true});
  };

  const handleLogout = async () => {
    try {
      // Send a POST request to the logout endpoint
      await axios.post('https://calorie-cugj.vercel.app/api/logout');
      // Clear token from local storage or cookies (if applicable)
      localStorage.removeItem('auth'); // Adjust if you're using cookies instead
      // Redirect to login page or homepage after logout
      window.location.href = '/login'; // or '/' for homepage
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  

  return (
    <div className="bg-gray-900 text-white w-[350px] flex flex-col min-h-screen">
      {/* Logo and Navbar */}
      <div className="sticky top-0 z-50 bg-gray-900 shadow-md w-full p-4">
        <div id="logo" className="h-[250px] flex items-center justify-center">
          <img src={img} alt="Logo" className="h-[150px] object-contain" />
        </div>

        {/* Navigation Links */}
        <ul className="mt-8 flex flex-col gap-2">
          <Link to='/dash'>
            <li className={`px-5 py-3 text-lg border-l-4 ${path === "" ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-900 hover:border-yellow-100`}>
              Dashboard
            </li>
          </Link>

          <Link to='/meals'>
            <li className={`px-5 py-3 text-lg border-l-4 ${path === "meals" ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-900 hover:border-yellow-100`} onClick={handleMeals}>
              Meals
            </li>
          </Link>

          <Link to='/news'>
            <li className={`px-5 py-3 text-lg border-l-4 ${path === "news" ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-900 hover:border-yellow-100`}>
              News
            </li>
          </Link>

          <Link to='/tools'>
            <li className={`px-5 py-3 text-lg border-l-4 ${path === "tools" ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-900 hover:border-yellow-100`}>
              Tools
            </li>
          </Link>

          {/* Logout Link */}
          <li className="px-5 py-3 text-lg border-l-4 border-transparent hover:bg-gray-900 hover:border-yellow-100 cursor-pointer" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
