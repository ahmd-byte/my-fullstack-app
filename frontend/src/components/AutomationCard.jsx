import React, { useState } from 'react';
import api from '../api/axiosConfig';

function AutomationCard({ id, name, description }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showError, setShowError] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error'

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    setShowResult(false);
    setShowError(false);
    setStatus('idle');

    try {
      const response = await api.get(`/automation/${id}`);
      setResult(response.data);
      setShowResult(true);
      setStatus('success');
    } catch (err) {
      console.error(`Error executing automation ${id}:`, err);
      setError(err.response?.data?.message || 'Failed to execute automation.');
      setShowError(true);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const toggleResult = () => setShowResult(!showResult);
  const toggleError = () => setShowError(!showError);

  // Status badge color
  const statusColor =
    status === 'success'
      ? 'bg-green-400'
      : status === 'error'
      ? 'bg-red-400'
      : 'bg-gray-400';

  return (
    <div className="relative w-96 bg-gray-900/70 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
      
      {/* Status Badge */}
      <span
        className={`absolute top-3 right-3 w-4 h-4 rounded-full ${statusColor} ring-2 ring-white/20`}
        title={
          status === 'success'
            ? 'Success'
            : status === 'error'
            ? 'Error'
            : 'Not executed'
        }
      />

      {/* Image Header */}
      <div className="h-56 w-full overflow-hidden rounded-t-2xl">
        <img
          src={`https://picsum.photos/id/${10 + id}/400/225`}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col gap-4">
        <h2 className="text-white text-xl font-semibold">{name}</h2>
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>

        {/* Execute Button */}
        <button
          onClick={handleExecute}
          disabled={loading}
          className={`w-full py-2 rounded-xl text-white font-medium 
            bg-gradient-to-r from-indigo-600 to-purple-600 
            hover:from-purple-600 hover:to-indigo-600 
            shadow-md hover:shadow-indigo-500/50 transition duration-300
            ${loading ? 'loading cursor-not-allowed' : ''}`}
        >
          {loading ? 'Executing...' : 'Execute Automation'}
        </button>

        {/* Result Panel */}
        {result && (
          <div className="mt-3">
            <button
              onClick={toggleResult}
              className="w-full text-left text-green-400 font-semibold hover:underline focus:outline-none"
            >
              {showResult ? '▼ Result' : '▶ Result'}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${showResult ? 'max-h-96 mt-2' : 'max-h-0'}`}
            >
              <div className="bg-gray-800 rounded-lg p-3 border border-green-400/30 text-gray-200 text-sm">
                <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
              </div>
            </div>
          </div>
        )}

        {/* Error Panel */}
        {error && (
          <div className="mt-3">
            <button
              onClick={toggleError}
              className="w-full text-left text-red-400 font-semibold hover:underline focus:outline-none"
            >
              {showError ? '▼ Error' : '▶ Error'}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${showError ? 'max-h-96 mt-2' : 'max-h-0'}`}
            >
              <div className="bg-red-800 rounded-lg p-3 border border-red-400/50 text-gray-200 text-sm">
                <p>{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AutomationCard;
