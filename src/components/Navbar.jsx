import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const {  user, login, logout, loading  } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-indigo-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-500 h-8 w-8 rounded-lg flex items-center justify-center shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <Link to="/" className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
          Xeno CRM
        </Link>
      </div>

      <div className="flex items-center gap-1 md:gap-3">
        
          <>
            <Link
              to="/create"
              className="px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-indigo-700 hover:text-indigo-100 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden md:inline">Create Campaign</span>
              <span className="md:hidden">Create</span>
            </Link>

            <Link
              to="/campaigns"
              className="px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-indigo-700 hover:text-indigo-100 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="hidden md:inline">View Campaigns</span>
              <span className="md:hidden">Campaigns</span>
            </Link>

            <Link
              to="/ai-generator"
              className="px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-indigo-700 hover:text-indigo-100 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l4.553 2.276a1 1 0 010 1.448L14 16m-4 0l-4.553-2.276a1 1 0 010-1.448L10 10m4 0l-4 6" />
              </svg>
              <span className="hidden md:inline">AI Generator</span>
            </Link>
          </>

        <div className="ml-2">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-300 hidden md:inline">{user.displayName}</span>
              <a
                href={`${import.meta.env.VITE_API_BASE_URL}/auth/logout`}
                className="px-3 py-1 text-sm rounded-md bg-red-500 hover:bg-red-600"
              >
                Logout
              </a>
            </div>
          ) : (
            <a
              href={`${import.meta.env.VITE_API_BASE_URL}/auth/google`}
              className="px-3 py-1 text-sm rounded-md bg-indigo-600 hover:bg-indigo-700"
            >
              Login with Google
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

