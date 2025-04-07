import React from 'react'
import { useNavigate } from 'react-router-dom'  // For navigation

const LandingPage: React.FC = () => {
  const navigate = useNavigate()

  // Navigate to vendor signup/login page
  const goToVendor = () => {
    navigate('/vendor')  // Adjust this route as per your routes
  }

  // Navigate to farmer signup/login page
  const goToFarmer = () => {
    navigate('/farmer')  // Adjust this route as per your routes
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Welcome to SokoHub</h1>
      <p className="mb-4 text-lg">Choose your role</p>

      <div className="space-y-4">
        <button
          onClick={goToVendor}
          className="w-64 py-3 bg-green-600 text-white font-semibold rounded shadow-lg hover:bg-green-700"
        >
          I'm a Vendor
        </button>
        <button
          onClick={goToFarmer}
          className="w-64 py-3 bg-blue-600 text-white font-semibold rounded shadow-lg hover:bg-blue-700"
        >
          I'm a Farmer
        </button>
      </div>
    </div>
  )
}

export default LandingPage
