import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProject, updateProject } from '../Slices/ProjectSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUser } from '../Slices/UsersSlices';
import {faPenToSquare, faDeleteLeft, faHourglass2 } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faPenToSquare, faDeleteLeft);

export default function ProjectTasks() {
    const projectData = useSelector(state=>state.project)
    const users = useSelector(state=>state.user)
    const {projectId,userId} = useParams()
    // const ProjectTasks = projectData[projectId].tasks
    const [projectTasks,setProjectTasks] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        dispatch(fetchProject(),fetchUser())
        
    },[])
    useEffect(()=>{
        projectData.map((item) => {
            if(item.id === projectId){
                setProjectTasks(item.tasks)
  
            }
        })
    },[projectData])
    const deleteTaskHandler = (id)=>{
        const updatedTasks = projectTasks.filter(item=>item.id!=id)
        let updatedProject = null
        projectData.map((item) => {
            if(item.id === projectId){
                updatedProject = {
                    ...item,
                    tasks: updatedTasks
                }
            }
        })


        dispatch(updateProject(updatedProject))
    }
    const checkHandler = (task) => {
        const updatedTasks = projectTasks.map((item) =>
          item.id === task.id ? { ...item, completed: !item.completed } : item
        );
      
        const updatedProject = {
          ...projectData.find((item) => item.id === projectId),
          tasks: updatedTasks,
        };
      
    
        setProjectTasks(updatedTasks);
      
        
        dispatch(updateProject(updatedProject));
      };
      const editTask = (id) => {
        navigate(`/edit/${projectId}/${userId}/${id}`)
      }
  return (
    <div className='lg:w-[80%] m-auto text-[20px]  border-border w-full rounded-lg text-text '>
    { 
          projectTasks.map(data =>{
              if(projectTasks.length!==0){
                console.log(projectTasks);
                    return(
                        <>
                        <div className='border-[1px] w-full bg-transparent p-2 border-second my-5 focus:outline-none rounded-lg'>
                        <div key={data.id} className=' flex justify-between items-center '>
                            <div className='overflow-hidden'>

                            {
                                users.map(user =>{
                                    if (user.id == data.writer)
                                    {
                                        return(
                                            <p className='font-bold'>{user.username} : {data.title}</p>
                                            )
                                            
                                        }
                                    })
                                }
                                {
                                    data.description?(<div className='overflow-hidden w-[80%] text-[17px] font-light '><p>Details : {data.description}</p></div>):(<></>)
                                }
                                {
                                    data.Edited?(<div className='overflow-hidden w-[80%] text-[17px] font-light '><p>Edited by : {data.Edited}</p></div>):(<></>)
                                }
                                <hr />
                            </div>
                                <div className='flex items-center gap-2 '>

                                <p>{data.date}</p>
                                <label className='container'>
                                    <input onChange={()=>checkHandler(data)} className='p-3' checked={data.completed} type='checkbox'/>
                                    <div className='checkmark'></div>
                                </label>
                                <button onClick={()=>deleteTaskHandler(data.id)} className='text-[20px] font-light px-4 py-2 border-[1px] border-border rounded-xl'><FontAwesomeIcon icon={faDeleteLeft} /></button>
                                <button onClick={()=>editTask(data.id)} className='text-[20px] font-light px-4 py-2 border-[1px] border-border rounded-xl'> <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> </button>
                            </div>
                        </div>
                        <div>
                            <p className='font-light text-[15px]'>Starts in : {data.startDate}</p>
                            <p className='font-light text-[15px]'>Ends in : {data.endDate}</p>
                        </div>
                        </div>
                        </>
                    )
                }else{
                    console.log("else");
                    return(
                        <div  className='w-full bg-transparent  flex justify-between items-center border-[1px] p-2 border-[#cbcaca77] my-5 focus:outline-none rounded-lg'>
                            <p>No Tasks</p>
                        </div>
                    )
                }
            })
        }
    
  </div>
  )
}
