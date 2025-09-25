import { useContext, useState } from "react"
import { assets } from "../assets/assets"
import {  Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from 'axios';
 import { toast} from 'react-toastify';

const Login = () => {
  const {backendUrl,setIsLogged,getUserData} = useContext(AppContext)
  const [state,setState] = useState('Sign up');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true
    try {
         if(state === 'Sign up') {
            const {data} = await axios.post(backendUrl+'/api/auth/register',{
              name,
              email,
              password
            })
            if(data.success) {
              setIsLogged(true);
              getUserData()
              navigate('/')
            }
            else {
              toast.error(data.message)
            }
         } else {
               const {data} = await axios.post(backendUrl+'/api/auth/login',{
              email,
              password
            })
            if(data.success) {
              setIsLogged(true)
              getUserData()
              navigate('/')
            }
            else {
               toast.error(err.response?.data?.message || err.message);
            }
         }
    } catch (err) {
       toast.error(err.message)
    }
  }

  return (
    <div className="flex items-center flex-col justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img src={assets.logo} alt="" onClick={()=>navigate('/')}
            className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
       />
       <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
       <h2 className="text-3xl font-semibold text-white text-center mb-3">
            {state === 'Sign up' ? 'Create account' : 'Login'}
       </h2>
       <p className="text-center text-sm mb-6">
            {state === 'Sign up' ? 'Create your account' : 'Login to your account!'}
       </p>
       <form onSubmit={handleSubmit}>
        {state === 'Sign up' && (<div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]">
            <img src={assets.person_icon} alt="" />
            <input type="text"
                value={name}
                onChange={e => setName(e.target.value)} 
                className="bg-transparent outline-none"
                placeholder="Full Name" required/>
          </div>
        )}
        
        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]">
            <img src={assets.mail_icon} alt="" />
            <input 
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)} 
                className="bg-transparent outline-none"
                placeholder="Email id" 
                required
            />
        </div>
        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]">
            <img src={assets.lock_icon} alt="" />
            <input 
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)} 
                className="bg-transparent outline-none"
                placeholder="Password" required/>
        </div>
        {state === "Login" && (<Link to='/reset-password' className="text-indigo-500 cursor-pointer">Forgot password ?</Link>)}
        <button 
            className="w-full mt-2 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium"
         >
            {state}
        </button>
       </form>
       {state === "Sign up" ? 
        (<p className="text-gray-400 text-center text-xs mt-4">
            Already have an account ? {' '}
            <span onClick={()=>setState('Login')} className="text-blue-400 cursor-pointer underline">Login here</span>
        </p>) 
         :(<p className="text-gray-400 text-center text-xs mt-4">
            Don't have an account ? {' '}
            <span onClick={()=>setState('Sign up')} className="text-blue-400 cursor-pointer underline">Sign up</span>
         </p>)
        }
       
       </div>
    </div>
  )
}

export default Login
