import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function AddActivity() {
  const location = useLocation();
  const { userId } = location.state || {};

  const [errorMsg, setErrorMsg] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState(null);
  const [action, setAction] = useState(""); // Single input for actions
  const [goal, setGoal] = useState(""); // Single input for goals
  const [tags, setTags] = useState(""); // Single input for tags
  const [actionArray, setActionArray] = useState([]); // Array for actions
  const [goalArray, setGoalArray] = useState([]); // Array for goals
  const [tagArray, setTagArray] = useState([]); // Array for tags
  const [type, setType] = useState("Donation");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [targetDonation, setTargetDonation] = useState(0);
  const [imgUrl, setImgUrl] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleArrayInput = (setter, arraySetter) => (e) => {
    const value = e.target.value;

    if (value.endsWith(",")) {
      // If the input ends with a comma, update the array and reset the input
      const newValue = value.slice(0, -1).trim(); // Remove the comma
      if (newValue) {
        arraySetter((prev) => [...prev, newValue]); // Add new value to array
      }
      setter(""); // Clear input field
    } else {
      setter(value); // Update the input field
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (
      !description ||
      !details ||
      !actionArray.length || // Check if there are any actions
      !goalArray.length || // Check if there are any goals
      !tagArray.length || // Check if there are any tags
      !startDate ||
      !endDate ||
      !image ||
      (type === "Donation" && targetDonation === 0)
    ) {
      setErrorMsg("Please fill out all fields before submitting.");
      scrollToTop();
      return;
    }

    if (!termsAgreed) {
      setErrorMsg("You must agree to the Terms and Conditions.");
      scrollToTop();
      return;
    }

    if (!userId) {
      setErrorMsg("User ID is not available.");
      scrollToTop();
      return;
    }

    setErrorMsg(""); // Clear error message on successful validation

    try {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `files/${v4()}`);
      await uploadBytes(storageRef, image);

      const url = await getDownloadURL(storageRef);

      const docRef = doc(db, "actions", userId);

      // Save activity data to Firestore
      await setDoc(docRef, {
        by: userId,
        description,
        details,
        goals: goalArray, // Store goals array
        tags: tagArray, // Store tags array
        toDo: actionArray, // Store actions array
        type,
        startDate,
        endDate,
        image: url,
        targetDonation,
      });

      // Clear the form after successful submission
      setDescription("");
      setDetails("");
      setImage(null);
      setAction(""); // Reset action input
      setGoal(""); // Reset goal input
      setTags(""); // Reset tags input
      setActionArray([]); // Reset actions array
      setGoalArray([]); // Reset goals array
      setTagArray([]); // Reset tags array
      setType("Donation");
      setStartDate("");
      setEndDate("");
      setTargetDonation(0);
      setTermsAgreed(false);
      setImgUrl(null);
    } catch (err) {
      console.error("Error adding activity:", err);
      setErrorMsg("There was an error submitting your activity.");
    }
  };

  return (
    <div className="bg-white raleway min-h-screen">
      <Header login={userId} />
      {errorMsg && (
        <div className="flex justify-center mt-4">
          <div className="bg-red-700 px-5 py-2 rounded-full text-white font-bold raleway">
            {errorMsg}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-2xl mx-auto p-4 mb-10"
      >
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
            value={description}
            onChange={handleInputChange(setDescription)}
            placeholder="Give a short description"
          />
        </div>

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
            value={details}
            onChange={handleInputChange(setDetails)}
            placeholder="Give a detailed description"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Add Image
          </label>
          <input
            type="file"
            id="image"
            className="w-full border rounded-lg p-2"
            onChange={handleImageChange}
          />
          {imgUrl && (
            <div>
              <img src={imgUrl} alt="Uploaded" className="mt-2 w-full h-auto" />
            </div>
          )}
        </div>

        {/* Actions Input */}
        <div className="mb-4">
          <label
            htmlFor="action"
            className="block text-gray-700 font-bold mb-2"
          >
            Describe what you will ask the participant to do (Separate topic by
            ",")
          </label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 h-12 mb-2"
            value={action}
            onChange={handleArrayInput(setAction, setActionArray)}
            placeholder="Help clean the..."
          />
          <div className="flex flex-wrap">
            {actionArray.map((act, index) => (
              <span
                key={index}
                className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full mr-2 mb-2"
              >
                {act}
              </span>
            ))}
          </div>
        </div>

        {/* Goals Input */}
        <div className="mb-4">
          <label htmlFor="goal" className="block text-gray-700 font-bold mb-2">
            Describe the goal that this action is trying to accomplish (Separate
            topic by ",")
          </label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 h-12 mb-2"
            value={goal}
            onChange={handleArrayInput(setGoal, setGoalArray)}
            placeholder="Lower flood chances..."
          />
          <div className="flex flex-wrap">
            {goalArray.map((g, index) => (
              <span
                key={index}
                className="bg-green-200 text-green-800 px-2 py-1 rounded-full mr-2 mb-2"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Tags Input */}
        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-700 font-bold mb-2">
            Add Tags (Separate topic by ",")
          </label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 h-12 mb-2"
            value={tags}
            onChange={handleArrayInput(setTags, setTagArray)}
            placeholder="Enter tags..."
          />
          <div className="flex flex-wrap">
            {tagArray.map((tag, index) => (
              <span
                key={index}
                className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Type Selection */}
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
            Activity Type
          </label>
          <select
            id="type"
            className="w-full border rounded-lg p-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Donation</option>
            <option>Activity</option>
            <option>Campaign</option>
          </select>
        </div>

        {type === "Donation" && (
          <div className="mb-4">
            <label
              htmlFor="targetDonation"
              className="block text-gray-700 font-bold mb-2"
            >
              Target Donation (in Rupiah)
            </label>
            <input
              type="number"
              id="targetDonation"
              className="w-full border rounded-lg p-2 h-12"
              value={targetDonation}
              onChange={(e) => setTargetDonation(parseInt(e.target.value))}
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
            className="w-full border rounded-lg p-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
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
            className="w-full border rounded-lg p-2"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Terms Checkbox */}
        <div className="mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="mr-2"
              checked={termsAgreed}
              onChange={() => setTermsAgreed(!termsAgreed)}
            />
            <label htmlFor="terms" className="text-gray-700 font-bold">
              I agree to the Terms and Conditions
            </label>
          </div>
          <p className="text-gray-700">
            You must agree to the Terms and Conditions before signing up for an
            account.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange hover:opacity-90 text-white font-bold py-2 px-4 rounded"
        >
          Add
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default AddActivity;
