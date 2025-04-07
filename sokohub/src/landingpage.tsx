import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage: React.FC = () => {
  const navigate = useNavigate()

  const [showModal, setShowModal] = useState(false)
  const [role, setRole] = useState<'vendor' | 'farmer' | null>(null)

  const handleRoleClick = (selectedRole: 'vendor' | 'farmer') => {
    setRole(selectedRole)
    setShowModal(true)
  }

  const handleNavigation = (type: 'login' | 'signup') => {
    if (role) {
      navigate(`/${role}/${type}`)
      setShowModal(false)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setRole(null)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Welcome to SokoHub</h1>
      <p className="mb-4 text-lg">Choose your role</p>

      <div className="space-y-4">
        <button
          onClick={() => handleRoleClick('vendor')}
          className="w-64 py-3 bg-green-600 text-white font-semibold rounded shadow-lg hover:bg-green-700"
        >
          I'm a Vendor
        </button>
        <button
          onClick={() => handleRoleClick('farmer')}
          className="w-64 py-3 bg-blue-600 text-white font-semibold rounded shadow-lg hover:bg-blue-700"
        >
          I'm a Farmer
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-80 text-center">
            <h2 className="text-xl font-bold mb-4 capitalize">
              {role} Portal
            </h2>
            <p className="mb-6">Choose an option below:</p>
            <div className="space-y-3">
              <button
                onClick={() => handleNavigation('login')}
                className="w-full py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
              >
                Login
              </button>
              <button
                onClick={() => handleNavigation('signup')}
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Sign Up
              </button>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 text-sm text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default LandingPage

