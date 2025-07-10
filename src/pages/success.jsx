import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  if (!state || !state.email || !state.password) {
    // If accessed directly, redirect to login
    navigate('/login', { replace: true });
    return null;
  }

  const maskedPassword = '*'.repeat(state.password.length);

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
        <p className="mb-2">You have successfully logged in.</p>
        <div className="mt-4 text-left">
          <p>
            <span className="font-semibold">Email:</span> {state.email}
          </p>
          <p>
            <span className="font-semibold">Password:</span> {maskedPassword}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;