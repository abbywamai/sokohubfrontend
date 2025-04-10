import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ProduceFilter from './filter.tsx'

const SelectedCategory = () => {
  const { category } = useParams()
  const [produce, setProduce] = useState([])
  const [filters, setFilters] = useState({})

  const fetchCategoryProduce = async () => {
    const params = new URLSearchParams({ category, ...filters } as any).toString()
    const res = await axios.get(`/api/produce?${params}`)
    setProduce(res.data)
  }

  useEffect(() => {
    fetchCategoryProduce()
  }, [category, filters])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{category} Produce</h2>
      <ProduceFilter onFilterChange={setFilters} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {produce.map((item: any) => (
          <div key={item.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{item.name}</h3>
            <p>Price: KES {item.unit_price}</p>
            <p>Qty: {item.quantity}</p>
            <p>Quality: {item.quality}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectedCategory
