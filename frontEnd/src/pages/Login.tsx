import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior
        try {
            const response = await fetch('https://backend-ten-neon-56.vercel.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials:'include',
                body: JSON.stringify({ email, password }),
            });
            const data=await response.json();

            
            if (response.ok) {
                localStorage.setItem('auth',data.token)
                console.log('User logged in successfully!');
                navigate('/meals'); // Redirect after successful login
            } else {
                console.error('Failed to log in');
                // Handle error case, e.g., show error message to user
            }
        } catch (error) {
            console.error('Error during login:', error);
            // Handle network or other errors
        }
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">Login to Your Account</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Please enter your credentials to access your account.</p>
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <input 
                            type="email" 
                            placeholder="your.email@example.com" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="block w-full px-4 py-3 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter your password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="block w-full px-4 py-3 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                            required 
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-3 text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account? <a href="/sign" className="text-blue-500 hover:text-blue-400">Sign Up</a>
                </p>
            </div>
        </section>
    );
};

export default Login;
