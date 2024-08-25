import axios from 'axios';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  async function loginHandler(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post('/login', { email, password });
      setUser(data);
      alert('Login successful');
      navigate('/');
    } catch (e) {
      alert('Please check your email and password and try again later!');
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32 border-2 rounded-2xl p-8 shadow-md shadow-gray-400">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={loginHandler}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <button 
            className="primary bg-blue-500 text-white rounded-full p-2 transition duration-300 ease-in-out hover:bg-gray-600 hover:shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Aligning the content to the right */}
        <div className="flex flex-col items-end mt-4"> {/* Use flex-column with right alignment */}
          <div className="mb-2 text-gray-600"> {/* No longer centered */}
            <Link
              to="/forgot-password"
              className="underline text-gray-500 transition-colors duration-200 hover:text-gray-900"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="text-gray-700"> {/* No longer centered */}
            Don't have an account? 
            <Link
              to="/register"
              className="underline text-gray-500 transition-colors duration-200 hover:text-gray-900 ml-2"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
