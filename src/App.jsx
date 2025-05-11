import React from 'react';
import { Routes, Route , Router} from 'react-router-dom';
import Home from './pages/Home';
import Campaigns from './pages/Campaigns';
import CreateCampaign from './pages/createCampaign';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';



function App() {
  const { user } = useAuth();

  return (
    <>
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          {user && <Route path="/campaigns" element={<Campaigns />} />}
          {user && <Route path="/create" element={<CreateCampaign />} />}
        </Routes>
    </>
  );
}

export default App;
