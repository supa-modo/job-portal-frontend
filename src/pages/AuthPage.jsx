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
  TbLockFilled,
} from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import {
  PiPasswordDuotone,
  PiSignInDuotone,
  PiUploadDuotone,
  PiUserDuotone,
} from "react-icons/pi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
                className="text-2xl font-nunito font-extrabold tracking-tight mb-2 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
              >
                Company Name Placeholder
              </motion.h1>
              <motion.h2
                className="text- font-semibold uppercase mb-10 text-center text-gray-300 underline underline-offset-8"
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
                      <p className="font-semibold text-green-600">
                        Track Application Status
                      </p>
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
                      <p className="font-semibold text-green-600">
                        Update Your Applications
                      </p>
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
                      <p className="font-semibold text-green-600">
                        Manage Your Documents
                      </p>
                      <p className="text-sm opacity-90">
                        Upload or update resumes, cover letters, and other files
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.p
              className="text-xs mt-6 text-center italic text-amber-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            >
              Your information remains confidential and is used solely for
              recruitment purposes.
            </motion.p>
          </div>

          {/* Right Panel - Auth Form */}
          <div className="md:w-1/2 p-12 mt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
            >
              <h2 className="text-2xl font-extrabold text-center text-primary-light mb-2">
                {isLogin
                  ? "Sign In to Continue Application"
                  : "Create Your Applicant Account"}
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-bold font-nunito text-amber-600  hover:text-amber-700 ml-1 transition-colors"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </motion.div>

            <motion.form
              className="space-y-7  "
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="">
                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      key="name"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-3"
                    >
                      <label
                        htmlFor="name"
                        className="block text-sm font-bold font-nunito text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <PiUserDuotone className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          className="block w-full pl-12 pr-3 py-2.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-extralight focus:border-primary-extralight sm:text-sm transition duration-150 ease-in-out"
                          placeholder="John Doe"
                          value={formState.name}
                          onChange={handleInputChange}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="">
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold font-nunito text-gray-700 mb-1"
                  >
                    Your Email address
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <TbMail className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full pl-12 pr-3 py-2.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-extralight focus:border-primary-extralight sm:text-sm transition duration-150 ease-in-out"
                      placeholder="you@example.com"
                      value={formState.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mt-3">
                    <label
                      htmlFor="password"
                      className="block text-sm font-bold font-nunito text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PiPasswordDuotone className="h-5 w-5 text-gray-600" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        className="block w-full pl-12 pr-3 py-2.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-extralight focus:border-primary-extralight sm:text-sm transition duration-150 ease-in-out"
                        placeholder="••••••••"
                        value={formState.password}
                        onChange={handleInputChange}
                      />
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                        >
                          {showPassword ? (
                            <FaEyeSlash className="h-5 w-5" />
                          ) : (
                            <FaEye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 text-primary-light focus:ring-primary-light border-gray-300 rounded"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-2 text-sm text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-bold font-nunito tracking-tight text-primary-light hover:text-sidebar transition-colors"
                        >
                          Forgot your password?
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <motion.button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-extralight transition duration-150 ease-in-out"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <PiSignInDuotone className="h-5 w-5 text-gray-100 group-hover:text-gray-300" />
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
                  <span className="px-2 bg-gray-100/60 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <motion.button
                  className="w-full inline-flex justify-center items-center px-4 py-2 rounded-lg shadow-sm bg-white text-gray-500 border border-gray-300/60 hover:bg-gray-50 transition-colors
 duration-150"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <img
                    className="h-5 w-5 mr-2"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google logo"
                  />
                  <span className="text-sm font-medium">Google</span>
                </motion.button>
                <motion.button
                  className="w-full inline-flex justify-center items-center px-4 py-2 rounded-lg shadow-sm bg-white text-gray-500 border border-gray-300 hover:bg-gray-50 transition-colors
 duration-150"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <img
                    className="h-5 w-5 mr-2"
                    src="https://www.svgrepo.com/show/448234/linkedin.svg"
                    alt="LinkedIn logo"
                  />

                  <span className="text-sm  font-medium">LinkedIn</span>
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
