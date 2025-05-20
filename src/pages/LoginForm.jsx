import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // **Tanpa Backend: Simpan Dummy Data**
        if (email === "user@example.com" && password === "password123") {
            localStorage.setItem('token', 'dummy_token');
            navigate('/');  // Redirect ke halaman utama
        } else {
            setErrorMessage('Invalid email or password.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen text-gray-300 bg-gray-900">
            <div className="flex flex-col w-full max-w-lg bg-gray-800 rounded-lg shadow-lg md:flex-row md:max-w-4xl">
                
                <div className="w-full p-6 md:w-1/2 md:px-8 lg:px-12">
                    <h2 className="mb-4 text-2xl font-bold text-center text-white">Login Perpustakaan <br />Universitas Sariwangi</h2>
                    
                    {errorMessage && (
                        <div className="mb-4 text-sm text-center text-red-500">
                            {errorMessage}
                        </div>
                    )}

                    <form className="px-4" onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="email" className="block mb-1 text-sm font-semibold text-gray-400">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-2 text-sm text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500" 
                            />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="password" className="block mb-1 text-sm font-semibold text-gray-400">Password</label>
                            <div className="relative">
                                <input 
                                    id="password" 
                                    type={showPassword ? "text" : "password"} 
                                    name="password" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full p-2 text-sm text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500" 
                                />
                                
                                <div className="flex mt-4">
                                    <input 
                                        id="togglePasswordCheckbox" 
                                        type="checkbox" 
                                        checked={showPassword} 
                                        onChange={togglePasswordVisibility}
                                        className="shrink-0 mt-0.5 border-gray-700 rounded text-orange-500 focus:ring-orange-500" 
                                    />
                                    <label htmlFor="togglePasswordCheckbox" className="ml-3 text-sm text-gray-400">Show password</label>
                                </div>
                            </div>
                        </div>                

                        <div className="mb-3">
                            <button 
                                type="submit"
                                className="w-full p-2 text-sm font-semibold text-white transition bg-orange-600 rounded-lg hover:bg-orange-700"
                            >
                                Login
                            </button>
                        </div>
                        
                                  
                    </form>
                </div>

                <div className="hidden w-full p-6 md:block md:w-1/2">
                    <img 
                        src="https://th.bing.com/th/id/OIP.h8qCr42qmI2JNiJJSh5EBQHaEK?rs=1&pid=ImgDetMain" 
                        alt="Ilustrasi Login" 
                        className="object-contain w-full h-full" 
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
