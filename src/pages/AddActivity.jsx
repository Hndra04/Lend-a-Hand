import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { db, storage } from "../config/firebase"; // Import Firestore storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Storage functions
import { v4 } from "uuid";
import HeaderOrganizer from "../components/HeaderOrganizer";

function AddActivity() {
  const location = useLocation();
  const { userId } = location.state || {};

  const [errorMsg, setErrorMsg] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState(null);
  const [action, setAction] = useState("");
  const [goal, setGoal] = useState("");
  const [tags, setTags] = useState("");
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
      setImage(file); // Store the file directly
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (
      !description ||
      !details ||
      !action ||
      !goal ||
      !tags ||
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
      const storageRef = ref(storage, `files/${v4()}`); // Create a reference
      await uploadBytes(storageRef, image); // Await the upload

      // Get the download URL after uploading
      const url = await getDownloadURL(storageRef); // Get the URL for the uploaded image

      // Reference to Firestore document
      const docRef = doc(db, "actions", userId); // Use userId or some unique id

      // Save activity data to Firestore
      await setDoc(docRef, {
        by: userId,
        description,
        details,
        goals: goal,
        tags,
        toDo: action,
        type,
        startDate,
        endDate,
        image: url, // Save the image URL here
        targetDonation,
      });

      // Clear the form after successful submission
      setDescription("");
      setDetails("");
      setImage(null);
      setAction("");
      setGoal("");
      setTags("");
      setType("Donation");
      setStartDate("");
      setEndDate("");
      setTargetDonation(0);
      setTermsAgreed(false);
      setImgUrl(null); // Clear image URL after submission

      // Optionally, redirect or display a success message here
    } catch (err) {
      console.error("Error adding activity:", err);
      setErrorMsg("There was an error submitting your activity."); // Handle error appropriately
    }
  };

  return (
    <div className="bg-white raleway min-h-screen">
      <HeaderOrganizer login={userId} />
      {/* Error Message Display */}
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
        {/* Description Input */}
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
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Give a short description"
          />
        </div>

        {/* Details Textarea */}
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
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Give a detailed description"
          ></textarea>
        </div>

        {/* Image Upload */}
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

        {/* Action Input */}
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
            value={action}
            onChange={(e) => setAction(e.target.value)}
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
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
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
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="+ Nature"
          />
        </div>

        {/* Type Selection */}
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
            Type
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

        {/* Target Donation Input (if type is "Donation") */}
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
