import React, { useState } from 'react'
import axios from 'axios'

const FarmerSignup: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp_link: '',
    location: '',
    kephis_certified: '',
    kephis_certificate_no: '', // KEPHIS certificate number field
    pochi_la_biashara_no: '' // New field for Pochi La Biashara number
  })

  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // If there is a kephis_certificate_no, mark kephis_certified as true
      const kephis_certified = form.kephis_certificate_no ? true : false
      const data = { ...form, kephis_certified }
      const res = await axios.post('/api/farmer/signup', data)
      setMessage('Signup successful! Welcome ' + res.data.farmer.name)
    } catch (err) {
      console.error(err)
      setMessage('Signup failed. Check your info or try again later.')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Farmer Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'email', 'phone', 'whatsapp_link', 'location'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={(form as any)[field]}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        ))}

        {/* KEPHIS Certificate Number Field */}
        <input
          type="text"
          name="kephis_certificate_no"
          placeholder="KEPHIS Certificate Number (if applicable)"
          value={form.kephis_certificate_no}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />

        {/* Pochi La Biashara Number Field (Optional) */}
        <input
          type="text"
          name="pochi_la_biashara_no"
          placeholder="Pochi La Biashara Number (Optional)"
          value={form.pochi_la_biashara_no}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Sign Up
        </button>

        {message && <p className="text-sm mt-2 text-gray-700">{message}</p>}
      </form>
    </div>
  )
}

export default FarmerSignup
