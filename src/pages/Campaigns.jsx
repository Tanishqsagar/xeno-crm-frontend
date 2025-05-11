import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../services/api';

function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [logs, setLogs] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await api.get('http://localhost:5000/api/campaigns');
      setCampaigns(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLogs = async (campaignId) => {
    try {
      const res = await api.get(`http://localhost:5000/api/campaigns/${campaignId}/logs`);
      setLogs(res.data);
      setSelectedId(campaignId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
  <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500">Campaign History</h2>
      
      <div className="bg-indigo-50 px-3 py-1 rounded-full text-indigo-600 text-sm font-medium">
        {campaigns.length} Campaign{campaigns.length !== 1 ? 's' : ''}
      </div>
    </div>

    {campaigns.length === 0 ? (
      <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-100">
        <svg className="w-16 h-16 mx-auto text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
        </svg>
        <p className="mt-4 text-slate-500 font-medium">No campaigns created yet</p>
      </div>
    ) : (
      <div className="space-y-4">
        {campaigns.map(camp => (
          <div key={camp._id} className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden transition-all hover:shadow-md">
            <div className="flex justify-between items-center p-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" title="Active campaign"></span>
                  <h3 className="font-semibold text-slate-800 text-lg">{camp.name}</h3>
                </div>
                <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(camp.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    {camp.audienceSize.toLocaleString()} recipients
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => fetchLogs(camp._id)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  selectedId === camp._id 
                    ? 'bg-indigo-100 text-indigo-700 font-medium' 
                    : 'bg-white border border-slate-200 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                {selectedId === camp._id ? 'Viewing Stats' : 'View Stats'}
              </button>
            </div>

            {selectedId === camp._id && (
              <div className="border-t border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Delivery Stats
                  </h3>
                  
                  <div className="flex gap-2">
                    <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      {logs.filter(log => log.status === 'SENT').length} Sent
                    </span>
                    <span className="flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                      <span className="h-2 w-2 rounded-full bg-red-500"></span>
                      {logs.filter(log => log.status !== 'SENT').length} Failed
                    </span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-3">
                  {logs.map(log => (
                    <div 
                      key={log._id} 
                      className={`p-4 rounded-lg border ${
                        log.status === 'SENT' 
                          ? 'bg-green-50 border-green-100' 
                          : 'bg-red-50 border-red-100'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-1 p-1 rounded-full ${log.status === 'SENT' ? 'bg-green-100' : 'bg-red-100'}`}>
                          {log.status === 'SENT' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${log.status === 'SENT' ? 'text-green-800' : 'text-red-800'}`}>
                            {log.message}
                          </p>
                          <p className="text-xs mt-1 text-slate-500">
                            Status: <span className={`font-medium ${log.status === 'SENT' ? 'text-green-700' : 'text-red-700'}`}>
                              {log.status}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
</div>
  );
}

export default Campaigns;
