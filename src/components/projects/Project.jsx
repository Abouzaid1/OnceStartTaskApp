import React, { useEffect, useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import {faListCheck} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProject } from '../Slices/ProjectSlice';
import { NavLink, useParams } from 'react-router-dom';
import { fetchUser } from '../Slices/UsersSlices';
library.add(faListCheck);


export default function Project() {
  const [enrolledProjects,setEnrolledProjects] = useState([])
  const projects = useSelector(state => state.project)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  const {userId} = useParams()

  useEffect(()=>{
    dispatch(fetchProject())
    dispatch(fetchUser())
  },[])
  // useEffect(()=>{
  //   dispatch(fetchProject())
  // },[projects])
  useEffect(() => {
    const userEnrolledProjects = [];
  

    user.forEach((item) => {
      if (item.id === userId) {
        item.projectsEnrolled.forEach((enrolledProjectId) => {
          const foundProject = projects.find((project) => project.id === enrolledProjectId.id);
          
          if (foundProject) {
            userEnrolledProjects.push(foundProject);
          }
        });
      }
    });
  
    setEnrolledProjects(userEnrolledProjects);

  }, [projects,user]);

  
  


  return (
    <>
    {
      enrolledProjects.map(project=>{
        return(
         <div key={project.id} style={{borderColor:project.color,color:project.color}} className={`hover:bg-second opacity-70 cursor-pointer transition-all border-[1px] p-5 2xl:w-[30%]  w-full  text-text rounded-xl`}>
          <NavLink to={`/projectPage/${project.id}/${userId}`}>
          <p className='text-[19px] font-bold'>{project.name}</p>
          <div className='flex gap-5 items-center my-8 mt-12'>
          <FontAwesomeIcon icon="fa-solid fa-list-check" className=' text-[30px]' />
              <div>
                <p className='font-light'>{project.date}</p>
              </div>
          </div>
              <div>
                <p className='font-light'>{project.people.length} : Member</p>
              </div>
          </NavLink>
          {/* <button style={{borderColor:project.color,color:project.color}} className='my-3 border-1 border m-auto text-center px-6'>Enroll Now</button> */}
      </div>
        )
      })
    }
        
    </>
  )
}
