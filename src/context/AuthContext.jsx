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

import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, credentials, { withCredentials: true });
      setUser(res.data.user); // Set the user on successful login
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = () => {
    setUser(null); // Clear the user on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
