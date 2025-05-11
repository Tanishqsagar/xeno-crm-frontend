import { useState } from 'react';
import axios from 'axios';
import api from '../services/api';

const fields = ['totalSpend', 'visits', 'lastActive'];
const operators = ['>', '<', '>=', '<=', '==', '!='];

function CreateCampaign() {
  const [name, setName] = useState('');
  const [rules, setRules] = useState([
    { field: 'totalSpend', op: '>', value: '' }
  ]);
  const [response, setResponse] = useState(null);

  const addRule = () => {
    setRules([...rules, { field: 'totalSpend', op: '>', value: '' }]);
  };

  const removeRule = index => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    setRules(newRules);
  };

  const handleChange = (index, key, value) => {
    const newRules = [...rules];
    newRules[index][key] = value;
    setRules(newRules);
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post('http://localhost:5000/api/campaigns', {
        name,
        rules
      });
      setResponse(res.data);
    } catch (err) {
      console.error(err);
      alert('Error creating campaign');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
  <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-indigo-50">
    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500 mb-6">Create Campaign</h2>

    <div className="mb-6">
      <label className="block mb-2 font-medium text-slate-700 text-sm uppercase tracking-wider">Campaign Name</label>
      <input
        className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g., High-Value Re-Engagement"
      />
    </div>

    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-700">Targeting Rules</h3>
        <span className="bg-indigo-100 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full">
          {rules.length} Rule{rules.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="space-y-3">
        {rules.map((rule, i) => (
          <div key={i} className="flex gap-3 items-center p-4 bg-slate-50 rounded-lg border border-slate-100 hover:shadow-md transition-all">
            <select
              className="p-2 border border-slate-200 rounded-lg bg-white flex-1 focus:outline-none focus:ring-1 focus:ring-indigo-300"
              value={rule.field}
              onChange={(e) => handleChange(i, 'field', e.target.value)}
            >
              {fields.map(f => <option key={f}>{f}</option>)}
            </select>
            
            <select
              className="p-2 border border-slate-200 rounded-lg bg-white w-24 focus:outline-none focus:ring-1 focus:ring-indigo-300"
              value={rule.op}
              onChange={(e) => handleChange(i, 'op', e.target.value)}
            >
              {operators.map(o => <option key={o}>{o}</option>)}
            </select>
            
            <input
              className="p-2 border border-slate-200 rounded-lg bg-white flex-1 focus:outline-none focus:ring-1 focus:ring-indigo-300"
              value={rule.value}
              onChange={(e) => handleChange(i, 'value', e.target.value)}
              placeholder="Value"
            />
            
            <button 
              onClick={() => removeRule(i)} 
              className="bg-red-50 text-red-500 hover:bg-red-100 p-2 rounded-lg transition-colors"
              aria-label="Remove rule"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      
      <button
        onClick={addRule}
        className="mt-3 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Add Rule
      </button>
    </div>

    <div className="flex justify-end mt-8">
      <button
        onClick={handleSubmit}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
      >
        Launch Campaign
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>

    {response && (
      <div className="mt-6 p-5 bg-green-50 border-l-4 border-green-500 rounded-lg flex items-start">
        <div className="mr-3 bg-green-100 p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <p className="font-medium text-green-800">Campaign Created Successfully</p>
          <p className="text-sm text-slate-700 mt-1">Audience Size: <span className="font-semibold">{response.audience} customers</span></p>
        </div>
      </div>
    )}
  </div>
</div>

  );
}

export default CreateCampaign;
