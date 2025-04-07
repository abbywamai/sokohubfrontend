import React, { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'

interface VendorForm {
  name: string
  email: string
  phone: string
  password: string
  passwordConfirmation: string
  location: string
}

const VendorSignup: React.FC = () => {
  const [form, setForm] = useState<VendorForm>({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
    location: ''
  })

  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Phone number validation (basic check)
  const phoneRegex = /^[0-9]{10}$/;

  // Password strength check (at least 8 characters, 1 uppercase, 1 lowercase, 1 digit)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // Handle input change for form fields
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Validate form before submission
  const validateForm = (): boolean => {
    if (!emailRegex.test(form.email)) {
      setMessage('Please enter a valid email address.')
      return false
    }
    if (!phoneRegex.test(form.phone)) {
      setMessage('Phone number must be 10 digits.')
      return false
    }
    if (!passwordRegex.test(form.password)) {
      setMessage('Password must be at least 8 characters, with 1 uppercase letter, 1 lowercase letter, and 1 digit.')
      return false
    }
    if (form.password !== form.passwordConfirmation) {
      setMessage('Passwords do not match.')
      return false
    }
    return true
  }

  // Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    setMessage('')  // Clear any previous error messages

    try {
      // Make an API call to the backend to register the vendor
      const response = await axios.post('/api/vendor/signup', form)
      setMessage(`Signup successful! Welcome ${response.data.vendor.name}`)
    } catch (err) {
      console.error(err)
      setMessage('Signup failed. Please check your information or try again later.')
    } finally {
      setLoading(false)  // Stop the loading spinner after the request
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Vendor Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />

        {/* Phone Input */}
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />

        {/* Password Confirmation Input */}
        <input
          type="password"
          name="passwordConfirmation"
          placeholder="Confirm Password"
          value={form.passwordConfirmation}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />

        {/* Location Input */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
          disabled={loading}  // Disable the button while loading
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      {/* Display response message */}
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  )
}

export default VendorSignup
