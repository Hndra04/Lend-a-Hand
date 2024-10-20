import React, { useState } from "react"; // Import React and useState hook
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Footer from "../components/Footer"; // Import Footer component
import Header from "../components/Header"; // Import Header component

function EmailForm() {
  const [email, setEmail] = useState(""); // State for email input
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Here you could also handle email validation or API calls if necessary

    // Redirect to the New Password page
    navigate("/new-password"); // Redirect to new password route
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Form content */}
      <main className="flex-grow flex items-center justify-center">
        <form onSubmit={handleSubmit} className="max-w-lg w-full p-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border rounded-lg p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
          >
            ENTER
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default EmailForm; // Export EmailForm component
