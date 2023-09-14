import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../Slices/UsersSlices'
import { useParams } from 'react-router-dom'

export default function Mytasks() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const {userId} = useParams()
  const [counter,setCounter] = useState(0)
  useEffect(()=>{
    dispatch(fetchUser())
  },[])
  useEffect(()=>{
    setCounter(0)
    let completed = 0
    let percent = 0
    user.map(item=>{
      if(item.id===userId){
        item.tasks.map(task=>{
          if(task.completed){
           completed++
            percent = (completed / item.tasks.length) * 100
            setCounter(percent)
          }
        })
      }
    })
  },[user])
  return (
    <>
    <div className='border-[3px] bg-bg border-border w-full px-6 rounded-lg flex items-center justify-between'>
        <div>
          <p className='p-5 text-[25px] font-semibold text-text'>Daily <span className='text-[#f5f0cb]'>Tasks</span></p>
        </div>
      <div>
        <div className='text-text font-bold text-center'>{counter} %</div>
        <div className=" h-3 w-[100px] md:w-[300px] rounded-[50px] border-[1px] border-border ">
            <div className="transition-all h-[10px]  bg-text rounded-[50px]" style={{ width: `${counter}%` }}></div>
        </div>
      </div>
       </div>
    </>
  )
}
