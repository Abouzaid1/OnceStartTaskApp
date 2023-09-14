import React, { useState, useEffect } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../Slices/UsersSlices';
import { NavLink } from 'react-router-dom';
import {faHandshake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faHandshake);
export default function Welcome() {
  const {userId} = useParams()
  const peaple = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const [userName,setUserName] =useState("")
  useEffect(() => {
    dispatch(fetchUser())
  },[])
  useEffect(() => {
    peaple.map((item)=>{
      if(item.id==userId){
        setUserName(item.username)
      }
    })
  },[peaple])

  return (
    <>
    <div className='px-12 text-text font-bold flex justify-between items-center'>
      <div>
        <p className='lg:text-[45px] text-[35px] '>Nice To See You <span className='text-[#fdf7d2]'>{userName}  <FontAwesomeIcon className='text-[40px]' icon="fa-solid fa-handshake" /></span></p>
        <p className='text-[25px] mt-5'>DashBoard</p>

      </div>
      <div className='flex gap-5'>
      <NavLink to={`/newproject/${userId}`}>
      <button className='p-4 my-9 border-text hover:bg-text hover:text-main font-bold transition-all rounded-lg   border-[1px] border-dashed text-text'> Find a Project </button>
                            </NavLink>
      <NavLink to={"/login"}>
      <button className='p-4 my-9 border-text hover:bg-text hover:text-main font-bold transition-all rounded-lg   border-[1px] border-dashed text-text'> Logout </button>
                            </NavLink>
      </div>
    </div>
    </>
  )
}
