// @ts-ignore
import React, { useState, useEffect } from 'react';
import img from '../assets/logo.avif'; // Ensure this path is correct
import { Link } from "react-router-dom";
import axios from 'axios';

const Navbar = () => {
  const [path, setPath] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

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
    const token = localStorage.getItem('auth');
    // @ts-ignore
    const res = await axios.get('https://calorie-2.onrender.com/api/meal', { 
      headers: { 'Authorization': `Bearer ${token}` },
      withCredentials: true
    });
  };

  const handleLogout = async () => {
    try {
      // Send a POST request to the logout endpoint
      await axios.post('https://calorie-2.onrender.com/api/logout');
      // Clear token from local storage or cookies (if applicable)
      localStorage.removeItem('auth'); // Adjust if you're using cookies instead
      // Redirect to login page or homepage after logout
      window.location.href = '/login'; // or '/' for homepage
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-gray-900 text-white lg:w-[24vw] min-h-screen flex flex-col">
      {/* Logo and Hamburger Menu */}
      <div className="sticky top-0 z-50 bg-gray-900 shadow-md w-full p-4 flex items-center justify-between lg:hidden">
        <div className="h-[150px] flex items-center">
          <img src={img} alt="Logo" className="h-[100px] object-contain" />
        </div>
        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Links */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-900`}>
        <ul className="flex flex-col gap-2 p-4">
          <Link to='/dash' onClick={() => setIsOpen(false)}>
            <li className={`px-5 py-3 text-lg border-l-4 ${path === "" ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-800`}>
              Dashboard
            </li>
          </Link>
          <Link to='/meals' onClick={() => setIsOpen(false)}>
            <li className={`px-5 py-3 text-lg border-l-4 ${path === "meals" ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-800`} onClick={handleMeals}>
              Meals
            </li>
          </Link>
          <Link to='/news' onClick={() => setIsOpen(false)}>
            <li className={`px-5 py-3 text-lg border-l-4 ${path === "news" ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-800`}>
              News
            </li>
          </Link>
          <Link to='/tools' onClick={() => setIsOpen(false)}>
            <li className={`px-5 py-3 text-lg border-l-4 ${path === "tools" ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-800`}>
              Tools
            </li>
          </Link>
          <li className="px-5 py-3 text-lg border-l-4 border-transparent hover:bg-gray-800 cursor-pointer" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>

      {/* Desktop Navbar Links */}
      <div className="hidden lg:flex flex-col gap-2 p-4">
        <div className="flex items-center justify-center mb-4">
          <img src={img} alt="Logo" className="h-[150px] object-contain" />
        </div>
        <ul className="flex flex-col gap-2">
          <Link to='/dash'>
            <li className={`px-5 py-3 text-lg border-l-4 ${path === "" ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-800`}>
              Dashboard
            </li>
          </Link>
          <Link to='/meals'>
            <li className={`px-5 py-3 text-lg border-l-4 ${path === "meals" ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-800`} onClick={handleMeals}>
              Meals
            </li>
          </Link>
          <Link to='/news'>
            <li className={`px-5 py-3 text-lg border-l-4 ${path === "news" ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-800`}>
              News
            </li>
          </Link>
          <Link to='/tools'>
            <li className={`px-5 py-3 text-lg border-l-4 ${path === "tools" ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-800`}>
              Tools
            </li>
          </Link>
          <li className="px-5 py-3 text-lg border-l-4 border-transparent hover:bg-gray-800 cursor-pointer" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
