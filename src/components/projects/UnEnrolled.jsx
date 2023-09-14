import React, { useEffect, useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProject } from '../Slices/ProjectSlice';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
library.add(faListCheck);

export default function UnEnrolled() {
  const [enrolledProjects, setEnrolledProjects] = useState([])
  const projects = useSelector(state => state.project)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const { userId } = useParams()
  const navigate = useNavigate()
  const [searchValue,setSearchValue] = useState("")
  useEffect(() => {
    dispatch(fetchProject())
  }, [])
  useEffect(() => {
    const userEnrolledProjectIds = user
      .find((item) => item.id == userId)
      ?.projectsEnrolled.map((enrolledProject) => enrolledProject.id);

    if (userEnrolledProjectIds) {
      const unenrolledProjectsData = projects.filter(
        (project) => !userEnrolledProjectIds.includes(project.id)
      );
      setEnrolledProjects(unenrolledProjectsData);
    }
  }, []);


  // const enroll = (projectId)=>{
  //   let newMember = []
  //   let newUser = {}
  //   user.map((item) => {
  //     if (item.id === userId) {
  //       newMember = [...item.projectsEnrolled,{id: projectId}  ]
  //       newUser = {
  //         ...item,
  //         projectsEnrolled: [...newMember], 
  //       }
  //     }
  //   });
  //   console.log("hehe");
  //   dispatch(updateUser(newUser))
  //     .then((response) => {
  //       console.log("API Response:", response);
  //     })
  //     .catch((error) => {
  //       console.error("API Error:", error);
  //     });
  // }
  const codeCheck = (id) => {
    navigate(`/check/${id}/${userId}`)
  }
  const search = (e)=>{
    const inputValue = e.target.value.trim(); 

  if (inputValue !== "") {
    const matchingProjects = []
    enrolledProjects.map((project) =>{
      if(project.name.includes(inputValue) || project.code.includes(inputValue)){
        matchingProjects.push(project)
        setEnrolledProjects(matchingProjects)
      }
    }
    );
  }else{
    const userEnrolledProjectIds = user
      .find((item) => item.id == userId)
      ?.projectsEnrolled.map((enrolledProject) => enrolledProject.id);

    if (userEnrolledProjectIds) {
      const unenrolledProjectsData = projects.filter(
        (project) => !userEnrolledProjectIds.includes(project.id)
      );
      setEnrolledProjects(unenrolledProjectsData);
    }
  } 
  }

  return (

    <>
    <div className='p-12'>
    <NavLink to={`/${userId}`}><button className='border-[1px] text-text m-5 border-border rounded-md p-3 hover:brightness-200'>Back</button> </NavLink>
   </div>
   <div className='w-full'>
   <div className='m-auto  w-[600px] mb-12 gap-8 flex items-center'>
        <input onChange={(e)=>search(e)} type="text" className='border-border w-[500px] m-auto text-text  border-[1px] border-dashed px-7 py-5 rounded-[40px] text-[20px] focus:outline-none bg-main' placeholder='Project (Name or Code)' />
        <p className='text-text text-[20px] font-bold '>Search</p>
   </div>
   </div>
      <div className='mb-5 bg-bg text-[20px] border-[3px] w-[80%] m-auto p-5 border-border  rounded-lg text-text'>

        <div className='flex items-center justify-between w-full '>
          <p className='p-5  text-[25px] font-semibold text-text'><span className='text-[#f5f0cb] ms-[90px] text-[30px]'>Projects</span></p>
        </div>
        <div className=' flex flex-wrap gap-5 m-auto my-6 w-[90%] 2xl:flex-row flex-col'>
          
          {
            enrolledProjects.map(project => {
              return (
                <div key={project.id} style={{ borderColor: project.color, color: project.color }} className={`hover:bg-second opacity-70 cursor-pointer transition-all border-[1px] p-5 2xl:w-[23%]  w-full  text-text rounded-xl`}>
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
                  <button onClick={() => codeCheck(project.id)} style={{ borderColor: project.color, color: project.color }} className='my-3 border-1 border border-dashed m-auto text-[20px] font-bold py-2 text-center P-3 rounded-[30px] px-6'>Enroll Now</button>
                </div>
              )
            })
          }


        </div>
      </div>
    </>
  )
}
