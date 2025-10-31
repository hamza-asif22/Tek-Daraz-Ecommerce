import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react"; // 👁 icons for show/hide password

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success("Account created successfully!");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success("Welcome back!");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (token) navigate('/');
  }, [token, navigate]);

  return (
    <>
      <Helmet>
        <title>{currentState === 'Login' ? 'Login to TekDaraz' : 'Sign Up | TekDaraz'}</title>
        <meta
          name="description"
          content="Login or create an account on TekDaraz to shop premium mobiles, laptops, and accessories. Secure, fast, and user-friendly registration process."
        />
        <meta
          name="keywords"
          content="TekDaraz login, TekDaraz signup, create account, online electronics, mobiles, laptops, tech accessories Pakistan"
        />
        <meta name="author" content="TekDaraz" />
        <meta property="og:title" content="TekDaraz | Login or Sign Up" />
        <meta
          property="og:description"
          content="Access your TekDaraz account or create a new one to explore the best electronics deals in Pakistan."
        />
        <meta property="og:image" content="https://www.tekdaraz.com/assets/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tekdaraz.com/login" />
        <link rel="canonical" href="https://www.tekdaraz.com/login" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white text-gray-800">
        <motion.form
          onSubmit={onSubmitHandler}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center w-[90%] sm:max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <h1 className="text-3xl font-semibold text-blue-700">{currentState}</h1>
            <hr className="border-none h-[1.5px] w-8 bg-blue-700" />
          </div>

          {currentState === 'Sign Up' && (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Full Name"
              required
            />
          )}

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email Address"
            required
          />

          {/* ✅ Password field with show/hide toggle */}
          <div className="relative w-full mb-2">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="w-full flex justify-between text-sm text-blue-700 mt-1">
            {currentState === 'Login' ? (
              <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer hover:underline">
                Create an account
              </p>
            ) : (
              <p onClick={() => setCurrentState('Login')} className="cursor-pointer hover:underline">
                Already have an account? Login
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-700 text-white font-medium w-full py-2 rounded-lg mt-6 hover:bg-blue-800 transition-all duration-300"
          >
            {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
          </button>
        </motion.form>
      </main>
    </>
  );
};

export default Login;
