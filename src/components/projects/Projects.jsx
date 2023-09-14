import React, { useEffect } from 'react'
import Project from './Project';
import { NavLink, useParams } from 'react-router-dom';
import UnEnrolled from './UnEnrolled';
export default function Projects() {
  const {userId} = useParams()

  return (
    <>
    <div className='text-[20px] bg-bg border-[3px] p-5 border-border w-full rounded-lg text-text'>

        <div className='md:flex block  items-center gap-5 justify-between w-full'>
            <p className='p-5  text-[25px] font-semibold text-text'>Enrolled <span className='text-[#f5f0cb]'>Projects</span></p>
            <div className='flex  px-5 py-2 border-dashed text-text border-border border-[1px] justify-between items-center gap-3 rounded-lg'>
                <p>Create Project</p>
                <NavLink to={`/addProject/${userId}`}><button className='text-[30px] font-light px-3 border-[1px] border-dashed border-border rounded-3xl'> + </button></NavLink>
            </div>
        </div>
        <div className=' flex flex-wrap gap-5 m-auto my-6 2xl:flex-row flex-col'>
            <Project/>
            
        </div>
    </div>
    
    </>
  )
}
