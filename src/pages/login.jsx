import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useStateContext();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Mock login - in real app, you'd make an API call
    const mockUser = {
      name: email.split('@')[0],
      email,
      profileImage: null,
    };

    setUser(mockUser);
    localStorage.setItem('kanbanUser', JSON.stringify(mockUser));
    navigate('/ecommerce');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2 py-8">
      <form className="w-full max-w-md p-8 rounded-2xl shadow-2xl" onSubmit={handleLogin}>
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 font-semibold">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
        <button type="submit" className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">Login</button>
        <p className="mt-4 text-center">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-blue-400 underline">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;