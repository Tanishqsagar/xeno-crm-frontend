// import { useState } from 'react';
// import api from '../services/api'; // your Axios instance

// function AIMessageGenerator() {
//   const [productName, setProductName] = useState('');
//   const [customerType, setCustomerType] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleGenerate = async () => {
//     if (!productName || !customerType) return alert('Please fill in both fields.');

//     setLoading(true);
//     setMessage('');

//     try {
//       const res = await api.post(`${import.meta.env.VITE_API_BASE_URL}/generate`, { productName, customerType });
//       setMessage(res.data.message);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to generate message.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
//       <h2 className="text-2xl font-bold mb-4 text-indigo-700">🎯 AI Campaign Message Generator</h2>

//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1">Product Name</label>
//         <input
//           type="text"
//           className="w-full border border-gray-300 rounded px-3 py-2"
//           value={productName}
//           onChange={(e) => setProductName(e.target.value)}
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1">Customer Type</label>
//         <input
//           type="text"
//           className="w-full border border-gray-300 rounded px-3 py-2"
//           value={customerType}
//           onChange={(e) => setCustomerType(e.target.value)}
//         />
//       </div>

//       <button
//         onClick={handleGenerate}
//         className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition w-full"
//         disabled={loading}
//       >
//         {loading ? 'Generating...' : 'Generate AI Message'}
//       </button>

//       {message && (
//         <div className="mt-6">
//           <label className="block text-sm font-medium mb-1">Generated Message</label>
//           <div className="bg-gray-100 border rounded p-3 relative">
//             <p>{message}</p>
//             <button
//               className="absolute top-2 right-2 text-sm text-indigo-600 hover:underline"
//               onClick={() => navigator.clipboard.writeText(message)}
//             >
//               Copy
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AIMessageGenerator;


import { useState } from 'react';
import api from '../services/api'; // Your Axios instance

function AIMessageGenerator() {
  const [productName, setProductName] = useState('');
  const [customerType, setCustomerType] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleGenerate = async () => {
    if (!productName || !customerType) {
      setError('Please fill in both fields.');
      return;
    }
    
    setLoading(true);
    setMessage('');
    setError('');
    
    try {
      // Make sure the endpoint matches your backend route
      const res = await api.post('/api/ai/generate', { productName, customerType });
      
      if (res.data && res.data.message) {
        setMessage(res.data.message);
      } else {
        setError('Received an unexpected response format');
        console.error('Unexpected response:', res.data);
      }
    } catch (err) {
      console.error('API error:', err);
      setError(err.response?.data?.error || 'Failed to generate message. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">🎯 AI Campaign Message Generator</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Product Name</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="e.g. EcoBoost Water Bottle"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Customer Type</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={customerType}
          onChange={(e) => setCustomerType(e.target.value)}
          placeholder="e.g. Fitness enthusiasts"
        />
      </div>
      
      <button
        onClick={handleGenerate}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition w-full"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate AI Message'}
      </button>
      
      {message && (
        <div className="mt-6">
          <label className="block text-sm font-medium mb-1">Generated Message</label>
          <div className="bg-gray-100 border rounded p-3 relative">
            <p>{message}</p>
            <button
              className="absolute top-2 right-2 text-sm text-indigo-600 hover:underline"
              onClick={() => {
                navigator.clipboard.writeText(message);
                alert('Message copied to clipboard!');
              }}
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIMessageGenerator;