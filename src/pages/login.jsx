import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  // Real-time validation
  const validateEmail = (value) => {
    if (!value) return 'Email is required';
    if (!emailRegex.test(value)) return 'Invalid email format';
    return '';
  };

  const validatePassword = (value) => {
    if (!value) return 'Password is required';
    return '';
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(validatePassword(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (!emailErr && !passwordErr) {
      navigate('/success', { state: { email, password } });
    }
  };

  const isFormValid = !validateEmail(email) && !validatePassword(password);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={handleEmailChange}
            autoComplete="username"
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="current-password"
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>
        <button
          type="submit"
          className={`w-full py-2 rounded text-white font-semibold ${isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!isFormValid}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;