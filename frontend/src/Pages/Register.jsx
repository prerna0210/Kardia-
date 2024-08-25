import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name , SetName] =useState('');
    const [email , SetEmail] =useState('');
    const [password , SetPassword] =useState('');
    const navigate = useNavigate();

    async function registerUser(e) {
      e.preventDefault();
      try {
        await axios.post('/register', {
          name,
          email,
          password,
        });
        alert("Registration is successful!!")
        navigate('/login');
        
      } catch(e){
        alert('There was some issue !! please try again later');

      }
    }
  return (
    <div className="mt-4 grow flex items-center justify-around">
    <div className="mb-32 border-2 rounded-2xl p-8 shadow-md shadow-gray-400">
        <h1 className='text-4xl text-center mb-4'>Register</h1>
        <form className='max-w-md mx-auto' onSubmit={registerUser}>
            <input type="text" placeholder="Username" value={name} onChange={e=>SetName(e.target.value)}/>
            <input type="email" placeholder="Enter your @email" value={email } onChange={e=>SetEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={e=>SetPassword(e.target.value)}/>
            <button className="primary bg-blue-500 text-white rounded-full p-2 transition duration-300 ease-in-out hover:bg-gray-600 hover:shadow-lg">Submit</button>
        </form>
        <br></br>
        <div className='text-center py-2 text-gray-700'>
            Already registered?
            <Link
              to="/login"
              className="underline text-gray-500 hover:text-gray-900 transition-colors duration-200 ml-2">
              Login
            </Link>
          </div>


    </div>
    
</div>
  )
}

export default Register