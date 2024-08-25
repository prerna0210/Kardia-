import axios from 'axios';
import { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [password, SetPassword] = useState('');
    const navigate = useNavigate();
    const {id,token} = useParams();
    
    async function submithandler(e) {
        e.preventDefault();
        console.log({password});
        axios.post(`/reset-password/${id}/${token}`,{password})
        .then(response=>{
          if(response.status ===200){
            alert("reset succesful");
            navigate("/login");
          }
        }).catch(err=>
          console.log(err))
        
    
      }
  return (
    <div className="mt-4  flex items-center justify-around">
      <div className="mb-32 border-2 m-4 p-8 shadow-md shadow-gray-400">
        <h1 className='text-4xl text-center mb-4'>Reset Password</h1>
        <p>Please enter you new password</p>
        <form className='max-w-md mx-auto' onSubmit={submithandler}>
          <input type="password" placeholder="your new password" value={password} onChange={e => { SetPassword(e.target.value) }} />
        
          <button className="primary mt-4 mb-4 hover:text-gray-900 transition-colors duration-200">Submit</button>
        </form>
      
   </div> 
    </div>
  )
}

export default ResetPassword