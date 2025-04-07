
import React, { useState } from 'react'
import axios from 'axios'

interface Vendor {
  id: number
  name: string
  email: string
  phone: string
  location: string
  created_at: string
}

interface LoginResponse {
  vendor: Vendor
  token?: string
}

const VendorLogin: React.FunctionComponent = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [message, setMessage] = useState('')
  const [loginCount, setLoginCount] = useState(0)
  const [vendor, setVendor] = useState<Vendor | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post<LoginResponse>('/api/vendor/login', form)
      setVendor(res.data.vendor)
      setMessage(`Welcome back, ${res.data.vendor.name}!`)

      // Optional: Store token if backend provides it
      if (res.data.token) {
        localStorage.setItem('vendorToken', res.data.token)
      }
    } catch (error) {
      setVendor(null)
      setLoginCount(loginCount + 1)
      setMessage('Login failed. Please check your credentials.')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Vendor Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>

      {message && <p className="mt-4 text-gray-700">{message}</p>}
      <p className="text-xs text-gray-500 mt-2">Login attempts: {loginCount}</p>

      {vendor && (
        <div className="mt-4 p-4 bg-gray-100 rounded text-sm">
          <h3 className="font-semibold">Vendor Info:</h3>
          <p>Name: {vendor.name}</p>
          <p>Email: {vendor.email}</p>
          <p>Phone: {vendor.phone}</p>
          <p>Location: {vendor.location}</p>
        </div>
      )}
    </div>
  )
}

export default VendorLogin


