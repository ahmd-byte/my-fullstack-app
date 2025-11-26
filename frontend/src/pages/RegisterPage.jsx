import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="card w-96 bg-base-200/30 backdrop-blur-xl shadow-xl border border-white/10">
        
        <div className="card-body">
          <h2 className="text-center text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-center text-sm text-gray-300 mb-5">Join the automation dashboard</p>

          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label"><span className="label-text text-gray-200">Username</span></label>
              <input type="text" className="input input-bordered bg-black/30 text-white"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required />
            </div>

            <div className="form-control mt-4">
              <label className="label"><span className="label-text text-gray-200">Password</span></label>
              <input type="password" className="input input-bordered bg-black/30 text-white"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            </div>

            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

            <button type="submit"
              className={`btn w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-105 duration-300 ${loading ? 'loading' : ''}`}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="text-center text-sm mt-4 text-gray-300">
            Already have an account? <Link to="/login" className="text-cyan-400 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
