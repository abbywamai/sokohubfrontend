
import React from 'react'
import { useCart } from './cartcontext.tsx'
import axios from 'axios'

const Cart: React.FC = () => {
  const { cart, removeFromCart, total } = useCart()

  const handleCheckout = async () => {
    try {
      const vendorId = 1 // Replace this with actual vendor ID (you can use context or local storage for this)
      const paymentData = {
        vendor_id: vendorId,
        total_amount: total,
        produce: cart.map(item => ({
          produce_id: item.id,
          quantity: item.quantity,
        })),
      }
      // Make an API call to your payment route
      const response = await axios.post('/api/payment/mpesa', paymentData)

      if (response.status === 200) {
        alert('Payment initiated successfully. Please check your phone.')
      }
    } catch (error) {
      console.error(error)
      alert('There was an issue initiating the payment.')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y">
            {cart.map(item => (
              <li key={item.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Unit Price: KES {item.unit_price}</p>
                  <p>Total: KES {Number(item.unit_price) * item.quantity}</p>
                </div>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-right">
            <p className="text-lg font-bold">Grand Total: KES {total}</p>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
            >
              Proceed to Payment via M-Pesa
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
