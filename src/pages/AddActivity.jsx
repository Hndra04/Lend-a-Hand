import React, { useState } from "react"; // Importing React and useState hook
import Footer from "../components/Footer"; // Importing Footer component
import Header from "../components/Header"; // Importing Header component
import { useLocation } from "react-router-dom";

function AddActivity() {
  // Accept user credential
  const location = useLocation();
  const { userId } = location.state || {}; // Safely access userId

  // State variables to manage form inputs
  const [description, setDescription] = useState(""); // State for activity description
  const [details, setDetails] = useState(""); // State for activity details
  const [image, setImage] = useState(null); // State for storing uploaded image
  const [action, setAction] = useState(""); // State for participant action description
  const [goal, setGoal] = useState(""); // State for activity goal
  const [tags, setTags] = useState(""); // State for tags associated with activity
  const [type, setType] = useState("Donation"); // State for activity type
  const [startDate, setStartDate] = useState(""); // State for start date of the activity
  const [endDate, setEndDate] = useState(""); // State for end date of the activity
  const [termsAgreed, setTermsAgreed] = useState(false); // State for terms agreement checkbox
  const [targetDonation, setTargetDonation] = useState(0); // State for target donation amount

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    
    
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the uploaded file
    if (file) {
      const reader = new FileReader(); // Create a FileReader to read the file
      reader.onload = () => {
        setImage(reader.result); // Set image state to the file data
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div className="bg-white raleway">
      {" "}
      {/* Main container with white background */}
      <Header login={userId} /> {/* Render Header component */}
      <form onSubmit={handleSubmit} className="bg-white max-w-2xl mx-auto p-4 mb-10">
        {/* Form for adding an activity */}

        {/* Action Description Input */}
        <div className="mb-4">
          <label
            htmlFor="describe"
            className="block text-gray-700 font-bold mb-2"
          >
            Describe
          </label>
          <input
            type="text"
            id="describe"
            className="w-full border rounded-lg p-2 h-12"
            value={description} // Bind state to input
            onChange={(e) => setDescription(e.target.value)} // Update state on change
            placeholder="Give a short description"
          />
        </div>

        {/* Description Textarea */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Details
          </label>
          <textarea
            id="description"
            className="w-full border rounded-lg p-2 h-40 resize-none"
            value={details} // Bind state to textarea
            onChange={(e) => setDetails(e.target.value)} // Update state on change
            rows={3}
            placeholder="Give a detailed description"
          ></textarea>
        </div>

        {/* Image Upload Input */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Add Image
          </label>
          <input
            type="file"
            id="image"
            className="w-full border rounded-lg p-2" // Styling for file input
            onChange={handleImageChange} // Handle file change
          />
          {image && (
            <img
              src={image}
              alt="Uploaded image"
              className="mt-2 w-full h-auto"
            /> // Display uploaded image
          )}
        </div>

        {/* Action Description Input */}
        <div className="mb-4">
          <label
            htmlFor="action"
            className="block text-gray-700 font-bold mb-2"
          >
            Describe what you will ask the participant to do
          </label>
          <input
            type="text"
            id="action"
            className="w-full border rounded-lg p-2 h-12"
            value={action} // Bind state to input
            onChange={(e) => setAction(e.target.value)} // Update state on change
            placeholder="Help clean the..."
          />
        </div>

        {/* Goal Input */}
        <div className="mb-4">
          <label htmlFor="goal" className="block text-gray-700 font-bold mb-2">
            Describe the goal that this action is trying to accomplish
          </label>
          <input
            type="text"
            id="goal"
            className="w-full border rounded-lg p-2 h-12"
            value={goal} // Bind state to input
            onChange={(e) => setGoal(e.target.value)} // Update state on change
            placeholder="+ Lower flood chances"
          />
        </div>

        {/* Tags Input */}
        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-700 font-bold mb-2">
            Add tags that best describe this action
          </label>
          <input
            type="text"
            id="tags"
            className="w-full border rounded-lg p-2 h-12"
            value={tags} // Bind state to input
            onChange={(e) => setTags(e.target.value)} // Update state on change
            placeholder="+ Nature"
          />
        </div>

        {/* Activity Type Selection */}
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
            Type
          </label>
          <select
            id="type"
            className="w-full border rounded-lg p-2" // Styling for select input
            value={type} // Bind state to select
            onChange={(e) => setType(e.target.value)} // Update state on change
          >
            <option>Donation</option>
            <option>Activity</option>
            <option>Campaign</option>
          </select>
        </div>

        {/* Target Donation Input (only shown if type is "Donation") */}
        {type === "Donation" && (
          <div className="mb-4">
            <label
              htmlFor="targetDonation"
              className="block text-gray-700 font-bold mb-2"
            >
              Target Donation
            </label>
            <input
              type="number"
              id="targetDonation"
              className="w-full border rounded-lg p-2 h-12"
              value={targetDonation} // Bind state to input
              onChange={(e) => setTargetDonation(parseInt(e.target.value))} // Update state on change
              placeholder="Enter target donation amount"
            />
          </div>
        )}

        {/* Start Date Input */}
        <div className="mb-4">
          <label
            htmlFor="startDate"
            className="block text-gray-700 font-bold mb-2"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            className="w-full border rounded-lg p-2" // Styling for date input
            value={startDate} // Bind state to input
            onChange={(e) => setStartDate(e.target.value)} // Update state on change
          />
        </div>

        {/* End Date Input */}
        <div className="mb-4">
          <label
            htmlFor="endDate"
            className="block text-gray-700 font-bold mb-2"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            className="w-full border rounded-lg p-2" // Styling for date input
            value={endDate} // Bind state to input
            onChange={(e) => setEndDate(e.target.value)} // Update state on change
          />
        </div>

        {/* Terms and Conditions Checkbox */}
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
            {" "}
            {/* Removed margin */}
            You must agree to the Terms and Conditions before signing up for an
            account.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit" // Button type set to submit
          disabled={!termsAgreed} // Disable button until terms are agreed
          className="w-full bg-orange hover:opacity-90 text-white font-bold py-2 px-4 rounded" // Button styling
        >
          Add
        </button>
      </form>
      <Footer /> {/* Render Footer component */}
    </div>
  );
}

export default AddActivity; // Export AddActivity component
