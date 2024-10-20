import React, { useState } from "react"; // Importing React and useState
import Footer from "../components/Footer"; // Importing Footer component
import Header from "../components/Header"; // Importing Header component

import { auth } from "../config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const LoginPage = () => {
    // For navigation
    const navigate = useNavigate(); 

    const goToMain = (userId) => {
      navigate('/activities', { state: { userId }});
    };

    const goToOrganizer = (userId) => {
      navigate('/organizer', { state: { userId }});
    };

  // State variables for email and password
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Handle login logic here, e.g., API call
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const id = userCredential.user.uid;

      // Handle organizers
      const docRef = doc(db, 'organizers', id);

      if (docRef){
        goToOrganizer(id)
      }
      else{
        goToMain(id)
      }

    })
    .catch((error) => {
      console.log("Login error:", error.message);
    });
    
  };

  return (
    <div className="raleway">
      <Header />
      <div style={{height: '90vh'}} className=" flex items-center justify-center bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-16">
          {/* Left Side - Text and Logo */}
          <div className="md:w-1/2 md:text-left mb-6 md:mb-0 flex flex-col gap-3 px-20">
            <h1 className="text-6xl text-center font-bold">Welcome back!</h1>
            <h2 className="text-3xl text-center font-semibold">
              Let's continue our mission
            </h2>
            {/* Logo */}
            <div className="flex justify-center md:justify-center mt-3">
              <img
                src="/assets/Icons/Logo.png"
                alt="Lend-a-Hand Logo"
                className="h-60 filter invert sepia(0%) saturate(0%) hue-rotate(-180deg) brightness(100%)"
              />
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="md:w-1/2 bg-white rounded-lg p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {" "}
              <div>
                {/* Added onSubmit handler */}
                <label htmlFor="email" className="font-bold blue">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border rounded-md"
                  value={email} // Bind state to input
                  onChange={(e) => setEmail(e.target.value)} // Update state on change
                />
              </div>
              
              <div>
                <label htmlFor="Password" className="font-bold blue">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 border rounded-md"
                  value={password} // Bind state to input
                  onChange={(e) => setPassword(e.target.value)} // Update state on change
                />
              </div>
              
              <a href="forgot" className="text-blue-400 font-bold">
                I forgot my password {'>'}
              </a>
              <button
                type="submit"
                className="bg-orange text-white py-3 font-bold rounded-md hover:opacity-90 transition"
              >
                LOGIN
              </button>
              <p className="text-center text-gray-600 font-semibold">
                No Account Yet?{" "}
                <a href="/signup-page" className="text-blue-500">
                  {" "}
                  {/* Corrected link to sign up page */}
                  Sign up for an account {'>'}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
