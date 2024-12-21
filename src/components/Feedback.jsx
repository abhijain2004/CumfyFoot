import React, { useState } from "react";
import { FaCommentDots, FaStar } from "react-icons/fa";
import axios from "axios";

const Feedback = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    likeProducts: "",
    productQuality: 0,
    purchaseAgain: "",
    ratings: {
      quality: "",
      price: "",
      effectiveness: "",
      usefulness: "",
      innovative: "",
      durability: "",
    },
    missingFeatures: "",
  });
  const url=process.env.API_URL;
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [errors, setErrors] = useState({}); // State to track validation errors

  const handleRadioChange = (section, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  const handleRatingChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [field]: value,
      },
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required.";
    if (!formData.lastName) newErrors.lastName = "Last Name is required.";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!formData.email.includes("@")) newErrors.email = "Invalid email format.";
    if (!formData.likeProducts) newErrors.likeProducts = "Please select if you like the product.";
    if (!formData.purchaseAgain) newErrors.purchaseAgain = "Please select if you'll purchase again.";
    if (!formData.missingFeatures) newErrors.missingFeatures = "Please specify missing features.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsFormVisible(false);
      try {
        axios
          .post(`${url}/feedback`, formData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            alert("Thank you for your feedback!");
          })
          .catch((error) => {
            alert("Please Login First to Submit Feedback");
          });
      } catch (error) {
        console.error(error);
      }
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        likeProducts: "",
        productQuality: 0,
        purchaseAgain: "",
        ratings: {
          quality: "",
          price: "",
          effectiveness: "",
          usefulness: "",
          innovative: "",
          durability: "",
        },
        missingFeatures: "",
      })
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleStarClick = (value) => {
    setFormData({ ...formData, productQuality: value });
  };

  const handleCross = () => {
    setIsFormVisible(false);
  };

  return (
    <div>
      {/* Feedback Icon Button */}
      <button
        onClick={toggleFormVisibility}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform focus:outline-none"
      >
        <FaCommentDots size={24} />
      </button>

      {/* Feedback Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 ">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl relative overflow-scroll h-[85%]">
            <div
              onClick={handleCross}
              className="absolute top-4 right-4  text-gray-500 cursor-pointer hover:text-red-500 transition-colors "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Product Feedback Survey
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                    className={`mt-1 w-full border-gray-300 p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                      errors.firstName ? "border-red-500" : ""
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                    className={`mt-1 w-full border-gray-300 p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                      errors.lastName ? "border-red-500" : ""
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="(000) 000-0000"
                    onChange={handleChange}
                    className={`mt-1 w-full border-gray-300 p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                      errors.phoneNumber ? "border-red-500" : ""
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@example.com"
                    onChange={handleChange}
                    className={`mt-1 w-full border-gray-300 p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Radio button question */}
              <div>
                <label className="block text-gray-700">
                  Do you like our products?
                </label>
                <div className="mt-2 flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="likeProducts"
                      value="Yes"
                      onChange={handleChange}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="likeProducts"
                      value="No"
                      onChange={handleChange}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">No</span>
                  </label>
                </div>
                {errors.likeProducts && (
                  <p className="text-red-500 text-sm">{errors.likeProducts}</p>
                )}
              </div>

              {/* Star Rating for Product Quality */}
              <div>
                <label className="block text-gray-700">
                  How do you rate the quality of our products?
                </label>
                <div className="mt-2 flex space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FaStar
                      key={i}
                      size={32}
                      color={
                        formData.productQuality >= i ? "#ffc107" : "#e4e5e9"
                      }
                      onClick={() => handleStarClick(i)}
                      className="cursor-pointer"
                    />
                  ))}
                </div>
              </div>

              {/* Radio button for Purchase Again */}
              <div>
                <label className="block text-gray-700">
                  Would you purchase from us again?
                </label>
                <div className="mt-2 flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="purchaseAgain"
                      value="Yes"
                      onChange={handleChange}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="purchaseAgain"
                      value="No"
                      onChange={handleChange}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">No</span>
                  </label>
                </div>
                {errors.purchaseAgain && (
                  <p className="text-red-500 text-sm">{errors.purchaseAgain}</p>
                )}
              </div>

              {/* Open-Ended Question */}
              <div>
                <label className="block text-gray-700">
                  What features do you feel are missing from our products?
                </label>
                <textarea
                  name="missingFeatures"
                  onChange={handleChange}
                  className={`mt-1 w-full border-gray-300 p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors.missingFeatures ? "border-red-500" : ""
                  }`}
                />
                {errors.missingFeatures && (
                  <p className="text-red-500 text-sm">
                    {errors.missingFeatures}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white p-3 rounded-md font-semibold hover:from-blue-600 hover:to-teal-500 transition-colors"
              >
                Submit Feedback
              </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
