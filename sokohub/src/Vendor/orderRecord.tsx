import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
  id: number;
  produce_name: string;
  quantity: number;
  total_price: number;
  deposit_paid: boolean;
  order_status: string;
  mpesa_code: string;
  created_at: string;
}

const OrderRecord: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params: Record<string, string> = {};
      if (statusFilter) params.status = statusFilter;
      if (startDate) params.start_date = startDate;
      if (endDate) params.end_date = endDate;

      const res = await axios.get('/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });
      setOrders(res.data);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []); // fetch only once initially

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders(); // re-fetch with filters
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      <form onSubmit={handleFilterSubmit} className="mb-6 flex flex-wrap gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Apply Filters
        </button>
      </form>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded shadow">
              <p><strong>Produce:</strong> {order.produce_name}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Total Price:</strong> KES {order.total_price}</p>
              <p><strong>Deposit Paid:</strong> {order.deposit_paid ? "Yes" : "No"}</p>
              <p><strong>Status:</strong> {order.order_status}</p>
              <p><strong>M-Pesa Code:</strong> {order.mpesa_code || "N/A"}</p>
              <p><strong>Ordered On:</strong> {new Date(order.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderRecord;
