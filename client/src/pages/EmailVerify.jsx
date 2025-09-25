import { useRef, useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const inputRefs = useRef([]);
  const { backendUrl, getUserData,isLogged,userData } = useContext(AppContext);
  const navigate = useNavigate();

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').slice(0, 6); // only 6 chars
    paste.split('').forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const otp = inputRefs.current.map(input => input.value).join('');
      const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, { otp });

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(()=>{
    isLogged && userData && userData.isAccountVerified && navigate('/')
  },[isLogged,userData])

  return (
    <div className="flex items-center flex-col justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img  
        src={assets.logo}   
        alt="logo" 
        onClick={() => navigate('/')}
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <form className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm" onSubmit={handleSubmit}>
        <h1 className="text-white text-2xl font-semibold text-center mb-4">Email Verify OTP</h1>
        <p className="text-center mb-6 text-indigo-300">Enter the 6-digit code sent to your email id</p>

        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6).fill().map((_, index) => (
            <input 
              type="text"
              maxLength="1"
              key={index}
              required
              className="w-12 h-12 bg-[#333a5c] text-white text-center text-xl rounded-md"
              ref={(el) => inputRefs.current[index] = el}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)} 
            />
          ))}
        </div>

        <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full text-white">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
