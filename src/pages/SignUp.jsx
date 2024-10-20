import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  // Error msg
  const [errorMsg, setErrorMsg] = useState(false)

  // State variables for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("+62");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);

  // Validator
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$|^.{1,128}$/
  const nameRegex = /^[a-zA-Z\s]+$/
  const passRegex = /^[a-zA-Z0-9]{8,128}$/

  // For navigation
  const navigate = useNavigate(); 

  const goToMain = (userData) => {
    navigate('/activities', { state: { userData }});
  };

  const handleSubmit = async (e) => {
    // Prevent default form submission
    e.preventDefault();

    if(!nameRegex.test(firstName) || !nameRegex.test(lastName)){
      setErrorMsg('Name can only be alphabets!')
      return
    }
    else if(!emailRegex.test(email)){
      setErrorMsg('Invalid Email!')
      return
    }
    else if(!passRegex.test(password)){
      setErrorMsg('Password must be alphanumeric and be 8-128 long!')
      return
    }
    else if(!termsAgreed){
      setErrorMsg('You must agree to the T&C to continue!')
      return
    }
    else{
      setErrorMsg(false)
    }

    // Handle signup logic here, e.g., API call
    try{
      // Create new user with Firebase Authentication
      const authCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Prepare user data
      const userData = {
        email,
        firstName,
        lastName,
        countryCode,
        phoneNumber,
        activitiesID: [],
        donationsID: [],
        campaignsID: [],
      };

      // Add user data to Firestore
      const docRef = doc(db, "users", authCredential.user.uid);
      await setDoc(docRef, userData);

      // Redirect to main page with user data and ID
      goToMain({ id: authCredential.user.uid, ...userData });

      } catch (err){
        console.log(err)
      }
  };

  let error = 
    <div className={`absolute top-20 left-0 z-40 w-full flex justify-center ${errorMsg ? '' : 'hidden'}`}>
      <div className="bg-red-700 px-5 py-2 rounded-full text-white font-bold raleway">
        {errorMsg}
      </div>
    </div>
  
  return (
    <div className="raleway">
      <div className="relative">
          {error}
      </div>

      <Header />
      <div style={{height: '90vh'}} className=" flex items-center justify-center bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center p-6">
          {/* Left Side - Text and Logo */}
          <div className="md:w-1/2 md:text-left mb-6 md:mb-0 flex flex-col gap-3 px-20">
            <h1 className="text-6xl text-center font-bold">Sign-up to a great cause.</h1>
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-1/2">
                  <label className="font-bold blue" htmlFor="first-name">First Name</label>
                  <input
                    id="first-name"
                    type="text"
                    placeholder="First Name"
                    className="w-full p-3 border rounded-md"
                    value={firstName} // Bind state to input
                    onChange={(e) => setFirstName(e.target.value)} // Update state on change
                  />
                </div>
                
                <div className="w-1/2">
                  <label className="font-bold blue" htmlFor="first-name">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full p-3 border rounded-md"
                    value={lastName} // Bind state to input
                    onChange={(e) => setLastName(e.target.value)} // Update state on change
                  />
                </div>
              </div>

              <div>
                <label className="font-bold blue" htmlFor="number">Phone Number</label>
                <div className="flex items-center gap-4">
                  {/* Country Code Dropdown */}
                  <div className="flex items-center gap-4 w-32">
                      <select
                        value={countryCode} // Bind state to select
                        onChange={(e) => setCountryCode(e.target.value)} // Update state on change
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 rounded-md font-mono"
                      >
                        <option value="+62">🇮🇩 +62</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+81">🇯🇵 +81</option>
                        {/* Add more country codes as necessary */}
                      </select>
                  </div>

                  <input
                    type="text"
                    id="number"
                    placeholder="XXX-XXXX-XXXX"
                    className="w-full p-3 border rounded-md font-mono"
                    value={phoneNumber} // Bind state to input
                    onChange={(e) => setPhoneNumber(e.target.value)} // Update state on change
                  />
                </div>
              </div>

              <div>
                <label className="font-bold blue" htmlFor="email">Email</label>
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
                <label className="font-bold blue" htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 border rounded-md"
                  value={password} // Bind state to input
                  onChange={(e) => setPassword(e.target.value)} // Update state on change
                />
              </div>

              <div className="mb-4">
                <div className="flex items-center">
                  {/* Flexbox for checkbox and label */}
                  <input
                    type="checkbox"
                    id="terms"
                    className="mr-2" // Margin to right for spacing
                    checked={termsAgreed} // Bind state to checkbox
                    onChange={() => setTermsAgreed(!termsAgreed)} // Toggle state on change
                  />
                  <label htmlFor="terms" className="text-gray-700 font-bold">
                    I agree to the Terms and Conditions
                  </label>
                </div>
                <p className="text-gray-700">
                  You must agree to the Terms and Conditions before signing up
                  for an account.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-orange font-bold text-white py-3 rounded-md hover:opacity-90 transition"
              >
                SIGN UP
              </button>

              <p className="text-center font-bold text-gray-600">
                Already have an account?{" "}
                <a href="/login-page" className="text-blue-500">
                  Log in
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

export default SignUp;
