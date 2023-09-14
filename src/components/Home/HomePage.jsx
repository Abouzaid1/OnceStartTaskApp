import React from 'react'
import { NavLink,Link } from 'react-router-dom'
export default function HomePage() {

  return (
    <>
        <div className='w-full h-[100vh] bg-bg p-5'>
            <div className='flex items-center justify-end gap-6'>
             
              <NavLink to="/login"><button className='p-4 my-9 border-text hover:bg-text hover:text-main font-bold transition-all rounded-lg   border-[1px] border-dashed text-text'> Login </button></NavLink>
            </div> 
            <div className='md:p-6 h-[80vh] gap-12 items-center lg:flex'>
              <div className=''>

              <h1 className='md:text-[70px] my-5 text-text lg:w-[1000px]  text-[30px]  font-black'>Manage ,Oragnise and <span className='p-1 border-dashed rounded-[50px] border-[1px] border-text px-3 font-light'>Complete</span> your <span className='underline font-light'>Tasks</span></h1>
              
              <p className='py-6 text-text md:text-[20px] lg:w-[1200px]  text-[15px] '>
                        A task management app is a powerful tool designed to streamline and enhance the way individuals and teams organize, track, and complete tasks and projects. It provides a centralized platform for creating, assigning, prioritizing, and monitoring tasks, making it easier to collaborate, set goals, and meet deadlines efficiently. Task management apps typically offer features such as task categorization, due date reminders, progress tracking, and team communication tools, which foster improved productivity and time management. </p>
              </div>
              <div className='w-full'>
                  <img className='' src="../../../public/undraw_completed_tasks_vs6q.png" alt="" />
              </div>
            </div>
        </div>
    </>
  )
}
