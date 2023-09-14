import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './Slices/UsersSlices';
export default function LoginPage() {
  const [currentUsername, setCurrentUsername] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    AOS.init();
  }, [])
  const users = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUser())
  }, [])
  const getName = (e) => {
    
    setCurrentUsername(e.target.value)
  }
  const getPass = (e) => {
    
    setCurrentPassword(e.target.value)
  }
  const loginHandle = () => {
    let loginSuccessful = false;
  
    users.forEach((item) => {
      if (item.username === currentUsername && item.password === currentPassword) {
        loginSuccessful = true;
        navigate(`/${item.id}`);
      }
    });
  
    if (!loginSuccessful) {
      alert("Wrong username or password");
    }
  };
  return (
    <>
      <div className=' md:p-[100px]' data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="500">
     <div className='border-[1px] bg-bg border-border w-full md:w-[50%] m-auto my-6 rounded-lg flex items-center justify-between'>
         <p className='p-5 text-[25px] font-semibold text-text'>Login</p>
        </div>
        <div className='w-full'>
          <div className='md:w-[50%] bg-bg m-auto text-[20px] border-[1px] p-5 border-border w-full rounded-lg text-text '>
            <label className='text-text font-bold my-6'>User Name</label> <br />
            <input onChange={(e) => getName(e)} name='usename' type="text" placeholder='ex : Abouzaid' className='w-full my-5 bg-transparent border-[1px] p-2 border-[#cbcaca77] focus:outline-none rounded-lg' />
            <hr className='my-7 opacity-50' />
            <label className='text-text font-bold my-6'>Password</label> <br />
            <input onChange={(e) => getPass(e)} name='password' type="password" placeholder='ex : 1234567' className='w-full my-5 bg-transparent border-[1px] p-2 border-[#cbcaca77] focus:outline-none rounded-lg' />
            <hr className='my-7 opacity-50' />
            <div className='m-auto'>
              <button onClick={loginHandle} className='md:w-[70%] w-full mx-1 my-3 mr-6 border-[1px] border-border rounded-md p-3  hover:brightness-200'>Login</button>
              <NavLink to="/signup"><button className='md:w-[20%] w-full mx-1 my-3 border-[1px] border-border rounded-md p-3  hover:brightness-200'>Sign up</button></NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
