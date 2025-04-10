import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProduceFilter from './filter.tsx'

const ProduceList = () => {
  const [produce, setProduce] = useState([])
  const [filters, setFilters] = useState({})

  const fetchProduce = async () => {
    const params = new URLSearchParams(filters as any).toString()
    const res = await axios.get(`/api/produce?${params}`)
    setProduce(res.data)
  }

  useEffect(() => {
    fetchProduce()
  }, [filters])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Browse All Produce</h2>
      <ProduceFilter onFilterChange={setFilters} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {produce.map((item: any) => (
          <div key={item.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.category}</p>
            <p>Price: KES {item.unit_price}</p>
            <p>Qty: {item.quantity}</p>
            <p>Quality: {item.quality}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProduceList

