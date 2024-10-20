import './App.css'; 
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import LoginPage from './pages/LoginPage';
import AddActivity from './pages/AddActivity';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import Activities from './pages/Activities'
import User from './pages/User';
import Organizer from './pages/Organizer';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/regis-page" element={<SignUp />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/add-activity" element={<AddActivity />} />

        <Route path="/user" element={<User />} />
        <Route path="/organizer" element={<Organizer />} />
      </Routes>
    </Router>
  );
}

export default App;
