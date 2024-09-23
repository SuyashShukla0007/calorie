import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import img from '../assets/wallpaperflare.com_wallpaper.jpg'
// import { button } from "@/components/ui/button"

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <header className="bg-gray-800 shadow-lg py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-green-400">Calorie Control</h1>
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-6">
              <li className="text-sm text-gray-300">GET FIT • MANAGE WEIGHT • LIVE WELL • EAT BETTER</li>
              <li>
                <a href="/login">
                <button   className="text-black rounded-md border-green-400 bg-green-400 px-2 py-0.5 hover:bg-green-400 hover:text-gray-900">Login</button>
                </a>
                </li>
                
              <li>
                <a href="/sign">
                <button className="text-black rounded-md border-green-400 bg-green-400 px-2 py-0.5 hover:bg-green-400 hover:text-gray-900">Sign Up</button>
                </a>
                </li>
            </ul>
          </nav>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 py-4">
          <nav className="container mx-auto px-4">
            <ul className="flex flex-col items-center space-y-4">
              <li className="text-sm text-gray-300">GET FIT • MANAGE WEIGHT • LIVE WELL • EAT BETTER</li>
              <li><button   className="w-full text-green-400 border-green-400 hover:bg-green-400 hover:text-gray-900">Login</button></li>
              <li><button className="w-full bg-green-400 text-gray-900 hover:bg-green-500">Sign Up</button></li>
            </ul>
          </nav>
        </div>
      )}

      <main className="flex-grow">
        <section className="hero bg-gray-800 py-16">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-green-300">Eat Smarter, Live Better</h2>
              <p className="text-xl text-gray-300 mb-8">
                Take control of your nutrition with our expert tips and comprehensive guides designed to help you eat better and live healthier.
              </p>
              <p className="font-bold text-xl text-green-400 mb-8">Sign up and start your fitness journey</p>
              <a href="/login">
              <button className="bg-green-400 rounded-lg text-gray-900 hover:bg-green-500 text-lg px-8 py-3">
               
                Get Started</button>
                </a>
            </div>
            <div className="md:w-1/2">
              <img
                src={img}
                alt="People enjoying healthy food"
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>

        <section className="features py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12 text-green-300">Why Choose Calorie Control?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Personalized Plans", description: "Tailored nutrition and workout plans just for you." },
                { title: "Expert Guidance", description: "Access to certified nutritionists and fitness trainers." },
                { title: "Progress Tracking", description: "Easy-to-use tools to monitor your health journey." }
              ].map((feature, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold mb-4 text-green-400">{feature.title}</h4>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">&copy; 2024 Calorie Control. All rights reserved.</p>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-sm text-gray-400 hover:text-green-400">Privacy Policy</a></li>
            <li><a href="#" className="text-sm text-gray-400 hover:text-green-400">Terms of Service</a></li>
            <li><a href="#" className="text-sm text-gray-400 hover:text-green-400">Contact Us</a></li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

