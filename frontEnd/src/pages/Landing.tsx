// import React from 'react';

const Landing = () => {
  return (
    <div className="overflow-auto h-screen bg-gray-900 text-gray-200 flex flex-col justify-between">
      <header className="bg-gray-900 shadow-lg py-4">
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold  pt-12 lg:pt-0 left-6 text-green-400">Calorie Control</h1>

          <nav>
            <ul className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <li className="text-white font-semibold text-xs sm:text-base hover:text-green-400 cursor-pointer">
                <p className='absolute right-[15%] top-6'>
                GET FIT • MANAGE WEIGHT • LIVE WELL • EAT BETTER
                </p>
              </li>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <button className="px-4 py-2 bg-green-400 text-gray-900 font-bold rounded-md hover:bg-green-300 transition text-sm sm:text-base">
                  <a href="/">SIGN UP</a>
                </button>
                <button className="px-4 py-2 bg-transparent border border-green-400 text-green-400 font-bold rounded-md hover:bg-green-400 hover:text-gray-900 transition text-sm sm:text-base">
                  <a href="/login">LOGIN</a>
                </button>
              </div>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero bg-gray-800 pt-12 sm:pt-16 pb-12 sm:pb-16">
          <div className="container mx-auto flex flex-col md:flex-row items-center px-4 sm:px-6">
            <div className="hero-text text-center md:text-left md:w-1/2 mb-12 md:mb-0">
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-green-300">Eat Smarter, Live Better</h2>
              <p className="text-base sm:text-xl text-gray-300 max-w-lg mx-auto md:mx-0">
                Take control of your nutrition with our expert tips and comprehensive guides designed to help you eat better and live healthier.
              </p>
              <p className="font-bold text-lg sm:text-xl pt-6 text-green-400">Sign up and start your fitness journey</p>
            </div>
            <div className="hero-image md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Two men cooking in the kitchen"
                className="w-full h-auto rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-6 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <p className="text-sm sm:text-base text-gray-400">&copy; 2024 Calorie Control. All rights reserved.</p>
          <ul className="flex space-x-4 mt-4 sm:mt-0">
            <li>
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm sm:text-base">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm sm:text-base">Terms of Service</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm sm:text-base">Contact Us</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
