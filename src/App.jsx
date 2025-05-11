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
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';
import AIMessageGenerator from './components/AIMessageGenerator';

function App() {
  const { user, loading } = useAuth(); // Destructure loading from useAuth context

  // Show loading screen while fetching user data
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Protect these routes if the user is authenticated */}
        {user && <Route path="/campaigns" element={<Campaigns />} />}
        {user && <Route path="/create" element={<CreateCampaign />} />}
        {user && <Route path="/ai-generator" element={<AIMessageGenerator />} />}

        {/* Redirect users who are not logged in to home */}
        {!user && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </>
  );
}

export default App;
