import React, { useEffect, useState } from 'react';

const deliveryStages = [
  'Order Confirmed',
  'Preparing for Pickup',
  'Picked up from Farm',
  'In Transit',
  'Almost There...',
  'Delivered to Destination'
];

const Delivery: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (currentStage < deliveryStages.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStage(prev => prev + 1);
      }, 2000); // 2 seconds delay for each stage
      return () => clearTimeout(timer);
    }
  }, [currentStage]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <h1 className="text-2xl font-bold mb-6">🚚 Delivery Simulation</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {deliveryStages.map((stage, index) => (
          <div key={index} className="flex items-center space-x-4 mb-4">
            <div className={`w-6 h-6 rounded-full text-white flex items-center justify-center 
              ${index === currentStage ? 'bg-green-600' : index < currentStage ? 'bg-green-400' : 'bg-gray-300'}`}>
              {index < currentStage ? '✓' : index === currentStage ? '⏳' : ''}
            </div>
            <p className={`${index <= currentStage ? 'font-semibold' : 'text-gray-400'}`}>{stage}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Delivery;
