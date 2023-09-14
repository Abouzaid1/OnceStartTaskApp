import React from 'react'
import Welcome from './DashBoard/Welcome'
import Mytasks from './DashBoard/Mytasks'
import Tasks from './DashBoard/tasks/Tasks'
import Projects from './projects/Projects'
import UnEnrolled from './projects/UnEnrolled'
import { Route,Routes } from 'react-router-dom'
export default function Dashboard() {
  return (
    <>
    <Welcome/>
    <div className='flex w-full lg:flex-row flex-col'>
        <div className='w-full p-5'>

            <Mytasks/>
            <Tasks/>
            
        </div>
        <div className='w-full p-5'>
        <Projects/>
        </div>
    </div>
    </>
  )
}
