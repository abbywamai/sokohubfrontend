// src/pages/ProduceDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './cartcontext.tsx';

interface Produce {
  id: number;
  name: string;
  description: string;
  category: string;
  unit_price: number;
  quantity: number;
  quality: string;
  farmer_name: string;
  location: string;
  whatsapp_link: string;
}

const ProduceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [produce, setProduce] = useState<Produce | null>(null);
  const { addToCart, isInCart } = useCart();

  useEffect(() => {
    const fetchProduce = async () => {
      try {
        const response = await axios.get(`/api/produce/${id}`);
        setProduce(response.data);
      } catch (error) {
        console.error('Failed to fetch produce:', error);
      }
    };

    fetchProduce();
  }, [id]);

  const getWhatsAppLink = (phone: string, produceName: string) => {
    // Format phone number from 0XXXXXXXXX to 254XXXXXXXXX (for Kenya)
    const formattedPhone = phone.replace(/^0/, '254');
    const message = encodeURIComponent(`Hello, I'm interested in your ${produceName} on SokoHub.`);
    return `https://wa.me/${formattedPhone}?text=${message}`;
  };

  const getMapsLink = (location: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
  };

  const formatPrice = (price: number) => {
    return `KSh ${price.toFixed(2)}`;
  };

  if (!produce) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">{produce.name}</h1>
      <p className="mb-2 text-gray-700"><strong>Category:</strong> {produce.category}</p>
      <p className="mb-2 text-gray-700"><strong>Description:</strong> {produce.description}</p>
      <p className="mb-2 text-gray-700"><strong>Quality:</strong> {produce.quality}</p>
      <p className="mb-2 text-gray-700"><strong>Unit Price:</strong> {formatPrice(produce.unit_price)}</p>
      <p className="mb-2 text-gray-700"><strong>Available Quantity:</strong> {produce.quantity}</p>
      
      <hr className="my-4" />

      <h2 className="text-xl font-semibold mb-2">Farmer Details</h2>
      <p className="mb-1 text-gray-800"><strong>Name:</strong> {produce.farmer_name}</p>
      <p className="mb-1 text-gray-800">
        <strong>Location:</strong>{' '}
        <a 
          href={getMapsLink(produce.location)} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 underline">
          View on Map
        </a>
      </p>
      <p className="mb-4 text-gray-800">
        <strong>WhatsApp:</strong>{' '}
        <a
          href={getWhatsAppLink(produce.whatsapp_link, produce.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 underline"
        >
          Chat with Farmer
        </a>
      </p>

      <button
        onClick={() => addToCart({
          id: produce.id,
          name: produce.name,
          unit_price: produce.unit_price,
          quantity: 1, // default to 1; you can add quantity selection if needed
          farmer_id: 0, // optionally include if needed (or produce.farmer_id if returned)
          category: produce.category,
        })}
        disabled={isInCart(produce.id)}
        className={`w-full py-3 mt-4 font-semibold rounded ${
          isInCart(produce.id)
            ? 'bg-gray-400 cursor-not-allowed text-white'
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        {isInCart(produce.id) ? 'Already in Cart' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProduceDetailPage;

