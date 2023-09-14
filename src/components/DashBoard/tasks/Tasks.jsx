import React, { useEffect, useState } from 'react'
import Task from './Task'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom'
import { fetchUser, updateUser } from '../../Slices/UsersSlices'
import Datepicker from "react-tailwindcss-datepicker"; 
export default function Tasks() {
  const [value, setValue] = useState({ 
      startDate: null, 
      endDate: null
    }); 
    
    const handleValueChange = (newValue) => {

    setValue(newValue); 
    } 
  const [taskWriten,setTaskWriten] = useState("")
  const dispatch = useDispatch()
  const {userId} = useParams()
  const peaple = useSelector(state=>state.user)

    const inputValue = (e) => {
      setTaskWriten(e.target.value);
    }
  
  useEffect(()=>{
    dispatch(fetchUser())
  },[])
  
  const addTaskHandler = () => {
    if (taskWriten !== "" && value.startDate !== null && value.endDate !== null) {
      peaple.forEach((item) => {
        if (item.id === userId) {
          const newTask = {
            title: taskWriten,
            id: uuidv4(),
            taskWriter: userId,
            completed: false,
            startDate: value.startDate,
            endDate: value.endDate
          };
  
          const updatedTasks = [...item.tasks, newTask];
  
          const updatedPerson = {
            ...item,
            tasks: updatedTasks,
          };

          dispatch(updateUser(updatedPerson));
          setTaskWriten("");
        }
      });
    }
  };
  return (
    <div className='text-[20px] bg-bg border-[3px] p-5 my-5 border-border w-full rounded-lg  items-center text-text  justify-between ' >
      <div className='gap-5 flex'>
        <input placeholder='Enter your individual task' onChange={(e)=>inputValue(e)} value={taskWriten} type="text" className='w-full bg-transparent border-[1px] p-2 border-[#cbcaca77] focus:outline-none rounded-lg'/>
        <div  className="w-[80px] " >

        <Datepicker 
          primaryColor='orange'
          value={value} 
          
          onChange={handleValueChange} 
          showShortcuts={true} 
          /> 
        </div>
        <button onClick={()=>{taskWriten!=""?addTaskHandler():console.log();}} className='text-[30px] font-light px-4 border-[1px] border-border rounded-xl'> + </button>
        {/* <button onClick={()=>{taskWriten!=""?addTaskHandler():console.log();}} className='text-[30px] font-light px-4 border-[1px] border-border rounded-xl'> + </button> */}
      </div>
      <p className='my-2 text-[15px]'><span className='text-[#ffe0a5]'>NOTE : </span> It is required to set a Start and End date</p>
      <hr />
      <Task/>
    </div>
  )
}
 