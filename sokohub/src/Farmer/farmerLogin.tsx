import React, { useState } from 'react'
import axios from 'axios'

const FarmerLogin: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/farmer/login', form)
      setMessage('Login successful! Welcome back ' + res.data.farmer.name)
    } catch (err) {
      console.error(err)
      setMessage('Login failed. Check your info or try again later.')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Farmer Login</h2>
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
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Login
        </button>
        {message && <p className="text-sm mt-2 text-gray-700">{message}</p>}
      </form>
    </div>
  )
}

export default FarmerLogin
