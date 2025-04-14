
import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ReviewPage = () => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const { farmerId } = useParams();
  const navigate = useNavigate();

  const submitReview = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/reviews",
        {
          farmer_id: parseInt(farmerId!),
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Review submitted successfully!");
      navigate("/vendor/orders");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>

      <label className="block mb-2">Rating (1 to 5)</label>
      <input
        type="number"
        min={1}
        max={5}
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="w-full border p-2 mb-4"
      />

      <label className="block mb-2">Comment</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border p-2 mb-4"
      />

      <button
        onClick={submitReview}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Submit Review
      </button>
    </div>
  );
};

export default ReviewPage;
