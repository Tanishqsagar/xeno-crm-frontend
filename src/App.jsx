// import React from 'react';
// import { Routes, Route , Router} from 'react-router-dom';
// import Home from './pages/Home';
// import Campaigns from './pages/Campaigns';
// import CreateCampaign from './pages/createCampaign';
// import Navbar from './components/Navbar';
// import { useAuth } from './context/AuthContext';
// import AIMessageGenerator from './components/AIMessageGenerator';



// function App() {
//   const { user } = useAuth();

//   return (
//     <>
//       <Navbar></Navbar>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           {user && <Route path="/campaigns" element={<Campaigns />} />}
//           {user && <Route path="/create" element={<CreateCampaign />} />}
//           {user && <Route path="/ai-generator" element={<AIMessageGenerator />} />}
//         </Routes>
//     </>
//   );
// }

// export default App;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Campaigns from './pages/Campaigns';
import CreateCampaign from './pages/createCampaign';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';
import AIMessageGenerator from './components/AIMessageGenerator';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {user ? (
          <>
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/create" element={<CreateCampaign />} />
            <Route path="/ai-generator" element={<AIMessageGenerator />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
