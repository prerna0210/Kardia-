import axios from 'axios';
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../UserContext';
// import { response } from 'express';/

const ForgotPass = () => {
    const [email, SetEmail] = useState('');
    const navigate = useNavigate();
    
    async function loginhandler(e) {
        e.preventDefault();
        console.log({email});
        axios.post('/forgot-password',{email})
        .then(response=>{
          if(response.status ===200){
            alert("mail sent");
            navigate("/login");
          }
        }).catch(err=>
          console.log(err))
          // alert("check ur email")
        
    
      }
  return (
    <div className="mt-4  flex items-center justify-around">
      <div className="mb-32 border-2 m-4 p-8 shadow-md shadow-gray-400">
        <h1 className='text-4xl text-center mb-4'>Forgot Password</h1>
        <p>Please enter your registered email, an email will be sent with the reset link</p>
        <form className='max-w-md mx-auto' onSubmit={loginhandler}>
          <input type="email" placeholder="Enter your @email" value={email} onChange={e => { SetEmail(e.target.value) }} />
        
          <button className="primary bg-blue-500 text-white rounded-full p-2 transition duration-300 ease-in-out hover:bg-gray-600 hover:shadow-lg">Submit</button>
        </form>
      
   </div> 
    </div>
  )
}

export default ForgotPass