// import { createContext, useContext, useEffect, useState } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();


// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

  
// const fetchUser = async () => {
//   try {
//     const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
//       withCredentials: true
//     });
//     setUser(res.data.user);
//   } catch {
//     setUser(null);
//   } finally {
//     setLoading(false);
//   }
// };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, fetchUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
        withCredentials: true,
      });
      setUser(res.data.user);
      setLoading(false); // Set loading to false when the user is fetched
    } catch (error) {
      setUser(null);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
