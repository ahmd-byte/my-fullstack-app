import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-gray-900 bg-opacity-95 backdrop-blur-md text-white shadow-lg border-b border-white/10">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:scale-105 transition duration-300"
        >
          Automation Dashboard
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {token ? (
            <>
              <li>
                <Link className="hover:text-cyan-400 transition duration-200" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-ghost hover:bg-red-700 hover:text-white transition duration-200"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="hover:text-cyan-400 transition duration-200" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="hover:text-purple-400 transition duration-200" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
