import React,{useState,useEffect} from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { faCircleCheck,faTableColumns,faPeopleGroup,faPlus,faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './Slices/UsersSlices';
library.add(faCircleCheck,faTableColumns, faPeopleGroup, faPlus,faEllipsisVertical); // Add icons to the library
export default function Navbar() {
    const [date, setDate] = useState("")
    const users = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const {userId} = useParams()
    const [tst,setTst] = useState(0)
    const[projectss,setProjectss] = useState(0)
    useEffect(()=>{
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; 
      const day = currentDate.getDate();
      setDate(day + "/" + month + "/" +year)
      dispatch(fetchUser())
    },[])

    useEffect(() => {
        let inCompletedTasks = 0;
        users.forEach((item) => {
          if (item.id === userId) {
            setProjectss(item.projectsEnrolled.length)
            
            item.tasks.forEach((task) => {
              if (!task.completed) {
                inCompletedTasks++;
              }
            });
          }
        });
        setTst(inCompletedTasks);
      }, [users]); 
  return (
     <>
        <nav className=' w-full'>
            <div className=' lg:justify-between m-auto flex flex-row text-center items-center'>
                <div className='flex gap-3 p-12'>
                    <div className='flex items-center gap-3 text-second max-w-[fit-content]'>
                         <p><FontAwesomeIcon icon="fa-solid fa-circle-check" /></p>
                        <p className='text-[30px] text-text font-bold'>{tst}</p>
                        <p>Incompleted tasks</p>
                    </div>
                    <div className='flex items-center gap-3 text-second'>
                         <p><FontAwesomeIcon icon="fa-solid fa-people-group" /></p>
                        <p className='text-[30px] text-text font-bold'>{projectss}</p>
                        <p>Projects</p>
                    </div>
                </div>
                <div className='p-2 text-second hidden md:block'>
                    <div>
                        <p className='font-bold'>{date}</p>
                    </div>
                </div>
            </div>
        </nav>
     </>
  )
}
