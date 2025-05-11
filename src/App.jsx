import React from 'react';
import { Routes, Route , Router} from 'react-router-dom';
import Home from './pages/Home';
import Campaigns from './pages/Campaigns';
import CreateCampaign from './pages/createCampaign';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';
import AIMessageGenerator from './components/AIMessageGenerator';


function App() {
  const {  user, login, logout, loading  } = useAuth();

  return (
    <>
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* {user && <Route path="/campaigns" element={<Campaigns />} />}
          {user && <Route path="/create" element={<CreateCampaign />} />}
          {user && <Route path="/ai-generator" element={<AIMessageGenerator />} />} */}
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/create" element={<CreateCampaign />} />
          <Route path="/ai-generator" element={<AIMessageGenerator />} />
        </Routes>
    </>
  );
}

export default App;
