import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbMail,
  TbLock,
  TbUserCircle,
  TbBrandGoogle,
  TbBrandLinkedin,
  TbEye,
  TbEyeOff,
  TbChevronRight,
  TbClipboardText,
  TbEdit,
  TbFileUpload,
} from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { PiUploadDuotone } from "react-icons/pi";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/apply");
  };

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 bg-[url('/career00.jpg')] bg-cover bg-center blur-md" />

      {/* Content Container */}
      <div className="w-full max-w-4xl bg-white/80 rounded-3xl shadow-2xl overflow-hidden relative z-10">
        <div className="flex flex-col md:flex-row">
          {/* Left Panel - Decorative */}
          <div className="md:w-1/2 bg-gradient-to-br from-sidebar to-primary-light p-10 text-white flex flex-col justify-between">
            <div className="">
              <motion.div
                className="w-24 h-24 mx-auto mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
              >
                <img src="/joblogo.jpg" alt="logo" />
              </motion.div>
              <motion.h1
                className="text-3xl font-nunito font-extrabold tracking-tight mb-2 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
              >
                Company Name Example
              </motion.h1>
              <motion.h2
                className="text-lg font-semibold uppercase mb-6 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
              >
                Applicant Portal
              </motion.h2>

              <motion.div
                className="mt-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-11 px-1 bg-white/20 rounded-full flex items-center justify-center">
                      <TbClipboardText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Track Application Status</p>
                      <p className="text-sm opacity-90">
                        Monitor the progress of your submitted applications
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-11 px-1 bg-white/20 rounded-full flex items-center justify-center">
                      <TbEdit className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Update Your Applications</p>
                      <p className="text-sm opacity-90">
                        Complete or modify applications for open positions
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-11 px-2 bg-white/20 rounded-full flex items-center justify-center">
                      <PiUploadDuotone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Manage Your Documents</p>
                      <p className="text-sm opacity-90">
                        Upload or update resumes, cover letters, and other files
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.p
              className="text-xs mt-6 italic"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            >
              Your information remains confidential and is used solely for
              recruitment purposes.
            </motion.p>
          </div>

          {/* Right Panel - Auth Form */}
          <div className="md:w-1/2 p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isLogin ? "Sign in to your account" : "Create your account"}
              </h2>
              <p className="text-gray-600 mb-8">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-medium text-indigo-600 hover:text-indigo-500 ml-1 transition-colors"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </motion.div>

            <motion.form
              className="space-y-6"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <TbUserCircle className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TbMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                    placeholder="you@example.com"
                    value={formState.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TbLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                    placeholder="••••••••"
                    value={formState.password}
                    onChange={handleInputChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                    >
                      {showPassword ? (
                        <TbEyeOff className="h-5 w-5" />
                      ) : (
                        <TbEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <motion.button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <TbLock className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                  </span>
                  {isLogin ? "Sign in" : "Create account"}
                  <TbChevronRight className="ml-2 h-5 w-5" />
                </motion.button>
              </div>
            </motion.form>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <motion.button
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <TbBrandGoogle className="h-5 w-5 mr-2 text-red-500" />
                  <span>Google</span>
                </motion.button>
                <motion.button
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <TbBrandLinkedin className="h-5 w-5 mr-2 text-blue-600" />
                  <span>LinkedIn</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
