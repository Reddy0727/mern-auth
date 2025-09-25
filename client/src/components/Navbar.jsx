import { useContext } from 'react';
import {assets} from '../assets/assets'
import {  useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
    const navigate = useNavigate()
    const { userData ,backendUrl, setUserData,setIsLogged} = useContext(AppContext);

    const sendVerificationOtp = async () => {
      try {
         axios.defaults.withCredentials = true;
         const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');

         if(data.success) {
          navigate('/verify-email')
          toast.success(data.message)
         } else {
          toast.error(data.message)
         }
      } catch (error) {
        toast.error(error.message)
      }
    }

    const logout = async ()=>{
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.post(backendUrl + '/api/auth/logout');
        data.success && setIsLogged(false)
        data.success && setUserData(false)
        navigate('/')
        
      } catch (error) {
        toast.error(error.message)
      }
    } 
  return (
    <nav className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
        <img src={assets.logo} alt="logo" className='w-28 sm:w-32' />
        {userData ? 
          (<div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white cursor-pointer relative group'>
            {userData?.name ? userData.name[0].toUpperCase() : "?"}


            <div className='absolute w-30 hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
              <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
                {!userData.isAccountVerified && (<li onClick={sendVerificationOtp}>Verify Email</li>)}
                <li onClick={logout}>Logout</li>
              </ul>
            </div>
          </div>) :
          <button 
            onClick={()=>navigate('/login')}
            className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer'
          >
            Login
            <img src={assets.arrow_icon} alt="" />
          </button>
        }
        
    </nav>
  )
}

export default Navbar
