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

import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Campaigns from './pages/Campaigns';
import CreateCampaign from './pages/createCampaign';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';
import AIMessageGenerator from './components/AIMessageGenerator';

function App() {
  const { user, fetchUser } = useAuth();
  const navigate = useNavigate();

  // Fetch user on app load
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (user) {
      navigate('/campaigns'); // Redirect to campaigns page after login
    }
  }, [user, navigate]); // This effect runs whenever `user` is updated

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {user ? (
          <>
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/create" element={<CreateCampaign />} />
            <Route path="/ai-generator" element={<AIMessageGenerator />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </>
  );
}

export default App;
