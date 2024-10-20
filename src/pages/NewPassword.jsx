import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function NewPassword() {
  const [newPassword, setNewPassword] = useState(""); // State for new password
  const [repeatNewPassword, setRepeatNewPassword] = useState(""); // State for new password

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Handle new password logic here, e.g., API call to update password
    console.log("New password submitted:", newPassword);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <form onSubmit={handleSubmit} className="max-w-lg w-full p-6">
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-gray-700 font-bold mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full border rounded-lg p-3"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="repeatNewPassword"
              className="block text-gray-700 font-bold mb-2"
            >
              Repeat Your Password
            </label>
            <input
              type="password"
              id="repeatNewPassword"
              className="w-full border rounded-lg p-3"
              value={repeatNewPassword}
              onChange={(e) => setRepeatNewPassword(e.target.value)}
              placeholder="Repeat your new password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default NewPassword; // Export NewPassword component
