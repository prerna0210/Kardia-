import { Route, Routes } from "react-router-dom"

import Indexpage from "./Pages/Indexpage"
import Login from "./Pages/Login"
import Layout from "./components/Layout"
import Register from "./Pages/Register"
import axios from "axios"
import { UserContextProvider } from "./UserContext"
import Profilepage from "./Pages/Profilepage"
import ForgotPass from "./Pages/ForgotPass"
import ResetPassword from "./Pages/ResetPassword"


axios.defaults.baseURL ='http://localhost:3000'
axios.defaults.withCredentials =true;

function App() {
  

  return (
    
    <UserContextProvider >
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Indexpage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/account" element={<Profilepage/>}/> 
      <Route path="/forgot-password" element={<ForgotPass/>}/> 
      <Route path="/reset-password/:id/:token" element={<ResetPassword/>}/> 

      </Route>
    </Routes>
    </UserContextProvider>
   
  )
}

export default App
