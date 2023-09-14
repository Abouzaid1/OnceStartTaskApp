import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { fetchProject, deleteProject, addProject ,updateProject} from './Slices/ProjectSlice';
import { NavLink } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import ProjectTasks from './projects/ProjectTasks';
import { updateUser,fetchUser } from './Slices/UsersSlices';
import { v4 as uuidv4 } from 'uuid';
import Datepicker from "react-tailwindcss-datepicker"; 
import Friends from './projects/Friends';
import {faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faCircleInfo);
export default function Project() {
  const [value, setValue] = useState([{ 
    startDate: null,
    endDate: null 
  }]); 
  
  const handleValueChange = (newValue) => {

  setValue(newValue); 
  } 
  const [info,setInfo] = useState(false)
  let author = false
  const [username,setUsername] = useState("")
  const {userId} = useParams()

  const [task,setTask] = useState("")
  const [counter,setCounter] = useState("")
  const [textareaValue,setTextareaValue] = useState("")
  const people = useSelector(state=>state.user)
  useEffect(()=>{
    AOS.init();
  },[])


  const {projectId} = useParams()
  const project = useSelector(state => state.project)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(()=>{
    dispatch(fetchProject())
    dispatch(fetchUser())
  },[])
 
  useEffect(()=>{
    people.map((item) => {
      if (item.id === userId) {// Get the username
        setUsername(item.username);
      }
    });
    setCounter(0)
    let completed = 0
    let percent = 0
    project.map(item=>{
      if(item.id===projectId){
        item.tasks.map(task=>{
          if(task.completed){

            completed++
            percent = (completed / item.tasks.length) * 100

            setCounter(percent)
          }
        })
      }
    })
  },[project])

  const deleteProjectFunc = (id)=>{
    let newMember = []
    let newUser = {}
    people.map((item) => {
      newMember = item.projectsEnrolled.filter(project=> project.id  != id)
      newUser = {
        ...item,
        projectsEnrolled: [...newMember], 
      }
      dispatch(updateUser(newUser))
    });
    dispatch(deleteProject(id))
  }
  const authorCheck = ()=>{
    author = false
      project.map((projectItem)=>{
        if(projectItem.id === projectId){
          if (userId === projectItem.author ) {
            author = true
          }
        }
      })

  }
  authorCheck()
  const getTask = (e)=>{
    setTask(e.target.value)
  }


  const addTask = (project) => {
        setTask("");
        setTextareaValue("")
        const updatedTasks = [
          ...project.tasks,
          {
            writer: userId,
            id: uuidv4(),
            title: task,
            completed: false,
            startDate: value.startDate,
            endDate: value.endDate,
            description:textareaValue,
            Edited: null
          },
        ];
        const updatedProject = {
          ...project,
          tasks: updatedTasks,
        };
        dispatch(updateProject(updatedProject));
  };
  const leaveProjectFunc = (id)=>{
    let newMember = []
    let newUser = {}
    let newUsers = []
    let newProject = {}
    people.map((item) => {
        if (item.id === userId) {
        newMember = item.projectsEnrolled.filter(project=> project.id  != id)
        newUser = {
          ...item,
          projectsEnrolled: [...newMember], 
          }
      }
    });
    project.map(item=>{
      if (item.id == projectId){
        newUsers = item.people.filter(user=>user.id!=userId)
        newProject = {
          ...item,
          people:newUsers
        }
      }
    })
    dispatch(updateProject(newProject))
    dispatch(updateUser(newUser))
    navigate(`/${userId}`)
    
  }

  return (

      project.map(item=>{
        if (item.id == projectId){
          return(
            <>
            <div key={item.id} className='flex justify-between md:w-[80%] m-auto'>
              <NavLink to={`/${userId}`}><button className='border-[1px] text-text m-5 border-border rounded-md p-3 hover:brightness-200'>Back</button></NavLink>
              {
                author?(<NavLink to={`/${userId}`}><button onClick={()=>deleteProjectFunc(item.id)} className='border-[1px] text-text m-5 border-border rounded-md p-3 hover:brightness-200'>Delete project</button></NavLink>)
                :(<button onClick={()=>leaveProjectFunc(item.id)} className='border-[1px] text-text m-5 border-border rounded-md p-3 hover:brightness-200'>Leave project</button>)
              }
            </div>
             <div  className='w-full ' data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="500">
              <div>

             <div className='border-[3px] bg-bg border-border w-full md:w-[80%] m-auto my-6 rounded-lg flex items-center justify-between px-5'>
                  <p className='p-5 text-[20px]  font-semibold text-text'><span className='text-[25px] text-[#f5f0cb]'>{item.name}</span> : {item.code}</p>
                  <div>
                    <div className='text-text font-bold text-center'>{counter} %</div>
                    <div className=" h-3 w-[100px] md:w-[300px] rounded-[50px] border-[1px] border-border ">
                        <div className="transition-all h-[10px] bg-text rounded-[50px]" style={{ width: `${counter}%` }}></div>
                    </div>
                  </div>
                 </div>
              </div>
              <div className='md:w-[80%]  lg:flex gap-2 m-auto'>
                  <div className='my-5 '>

                  <Friends/>
                  </div>
                 <div className='text-[20px] bg-bg border-[3px] p-5 my-5 border-border md:w-[80%] m-auto rounded-lg  items-center text-text  justify-between ' >
                    <div className='gap-5 flex w-full md:w-[80%] m-auto my-6'>
                      <button onClick={()=>info?setInfo(false):setInfo(true)} className=' font-light px-3 border-[1px] border-border rounded-xl'><FontAwesomeIcon icon="fa-solid fa-circle-info" /></button>
                      <input onChange={(e)=>getTask(e)} value={task} type="text" placeholder='Enter The Project Task' className='w-full bg-transparent border-[1px] p-2 border-[#cbcaca77] focus:outline-none rounded-lg'/>
                      <div  className="w-[80px]" >
                              <Datepicker 
                                primaryColor='orange'
                                value={value} 
                                onChange={handleValueChange} 
                                /> 
                              </div>
                      <button onClick={()=>{task!=""?addTask(item):console.log();}} className='text-[30px] font-light px-4 border-[1px] border-border rounded-xl'> + </button>
                    </div>  
                    <div className="gap-5 flex md:w-[80%] m-auto my-6">
                      {
                        info?( <textarea
                          data-aos="fade-down" data-aos-easing="ease-in-out" 
                          data-aos-duration="200"
                          onChange={(e) => setTextareaValue(e.target.value)}
                          value={textareaValue}
                          placeholder="Enter task description..."
                          className="w-full bg-transparent border-[1px] p-2 border-[#cbcaca77] focus:outline-none rounded-lg"
                          id=""
                          cols="30"
                          rows="10"
                      ></textarea>):(<></>)
                      }
                   
                      </div> 
                      <hr />
                      <ProjectTasks/>
                  </div>
                        </div>
             </div>
            </>
          )
        }
        })
  )
}
