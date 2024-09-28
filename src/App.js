import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

// Login/SignUp Page Component
const Auth = ({ setToken, setUsername }) => {
  const [username, setLocalUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://196.46.192.67:5000/login' : 'http://196.46.192.67:5000/register';

    try {
      const response = await axios.post(url, { username, password });
      setToken(response.data.token);
      setUsername(username);
      navigate('/home'); // Redirect to home page after login/signup
    } catch (error) {
      console.error(error);
      alert('Error during authentication');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleAuth} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setLocalUsername(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-blue-500 hover:underline focus:outline-none"
        >
          {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
        </button>
      </div>
    </div>
  );
};

// Home Page Component
const Home = ({ username, setToken, setUsername }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    setUsername(null);
    navigate('/auth'); // Redirect to login/signup page after logout
  };

  if (!username) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome, {username}!</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

// App Component
const App = () => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth setToken={setToken} setUsername={setUsername} />} />
        <Route path="/home" element={<Home username={username} setToken={setToken} setUsername={setUsername} />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
};

export default App;
