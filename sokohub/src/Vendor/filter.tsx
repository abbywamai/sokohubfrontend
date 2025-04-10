import React, { useState } from 'react'

type Props = {
  onFilterChange: (filters: any) => void
}

const ProduceFilter: React.FC<Props> = ({ onFilterChange }) => {
  const [search, setSearch] = useState('')
  const [quality, setQuality] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [minQty, setMinQty] = useState('')
  const [maxQty, setMaxQty] = useState('')

  const handleFilterChange = () => {
    onFilterChange({ search, quality, minPrice, maxPrice, minQty, maxQty })
  }

  return (
    <div className="bg-white p-4 rounded shadow mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <input placeholder="Search by name or description" value={search} onChange={(e) => setSearch(e.target.value)} className="border p-2 rounded" />
      <input placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="border p-2 rounded" />
      <input placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="border p-2 rounded" />
      <input placeholder="Min Quantity" value={minQty} onChange={(e) => setMinQty(e.target.value)} className="border p-2 rounded" />
      <input placeholder="Max Quantity" value={maxQty} onChange={(e) => setMaxQty(e.target.value)} className="border p-2 rounded" />
      <select value={quality} onChange={(e) => setQuality(e.target.value)} className="border p-2 rounded">
        <option value="">All Quality</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button onClick={handleFilterChange} className="bg-green-600 text-white py-2 px-4 rounded col-span-full hover:bg-green-700">
        Apply Filters
      </button>
    </div>
  )
}

export default ProduceFilter
