import React, { useState } from 'react';
import img from '../assets/Calories_1200x628.jpg';
import { useNavigate } from 'react-router-dom';

const Sign = () => {
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [phone, setPhoneNumber] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const navigate = useNavigate();

    const PostUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        try {
            if (password !== confirmPassword) {
                alert('Passwords did not match');
                return;
            }

            const response = await fetch(' https://calorie-2.onrender.com/api/sign', {
                method: 'POST',
                headers: {
                    'Authorization':'',
                    'Content-Type': 'application/json'
                },
                credentials: 'include', 
                body: JSON.stringify({
                    firstname,
                    lastname,
                    phone,
                    email,
                    height,
                    weight,
                    password,
                    confirmPassword,
                   
                }),
            });
            const data=await response.json()

            // Handle response based on status, e.g., show success or error message
            if (response.ok) {
                localStorage.setItem('auth',data.token)
                console.log('User signed up successfully!');
                navigate('/meals'); 
                // Optionally, redirect or show a success message
            } else {
                console.error('Failed to sign up');
                // Handle error case, e.g., show error message to user
            }
        } catch (error) {
            console.error('Error during sign up:', error);
            // Handle network or other errors
        }
    };

    return (
        <section className="dark:bg-gray-900">
            <div className="flex justify-center min-h-screen">
                <div className="hidden bg-cover lg:block lg:w-2/5" style={{ backgroundImage: `url(${img})`, backgroundPosition: '20% 50%' }} />
                <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5 bg-opacity-0">
                    <div className="w-full">
                        <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                            Get your free account now.
                        </h1>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                            Let’s get you all set up so you can verify your personal account and begin setting up your profile.
                        </p>
                        <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" onSubmit={PostUser}>
                            <div>
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">First Name</label>
                                <input type="text" placeholder="John" value={firstname} onChange={(e) => setFirstname(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Last name</label>
                                <input type="text" placeholder="Snow" value={lastname} onChange={(e) => setLastname(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Phone number</label>
                                <input type="text" placeholder="XXX-XX-XXXX-XXX" value={phone} onChange={(e) => setPhoneNumber(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                                <input type="email" placeholder="johnsnow@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Height</label>
                                <input type="text" placeholder="Enter your height" value={height} onChange={(e) => setHeight(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Weight</label>
                                <input type="text" placeholder="Enter your weight" value={weight} onChange={(e) => setWeight(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Confirm password</label>
                                <input type="password" placeholder="Enter your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>
                         

                            <button
                                type="submit"
                                className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                            >
                                <span>Sign Up</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Sign;