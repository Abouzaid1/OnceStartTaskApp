import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUser, updateUser } from '../../Slices/UsersSlices';

export default function Task() {
  const { userId } = useParams();
  const peaple = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [person, setPerson] = useState([]);
 
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    const user = peaple.find((item) => item.id === userId);
    if (user) {
      setPerson(user.tasks || []);
    }
  }, [peaple, userId]);

  const deleteHandler = (id) => {
    const updatedTasks = person.filter((item) => item.id !== id);
    const updatedUser = {
      ...peaple.find((item) => item.id === userId),
      tasks: updatedTasks,
    };


    dispatch(updateUser(updatedUser));
  }

  const checkHandler = (taskId) => {
    const updatedTasks = person.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    const updatedUser = {
      ...peaple.find((item) => item.id === userId),
      tasks: updatedTasks,
    };
    dispatch(updateUser(updatedUser));
  }

  return (

      person.map((task) => (
        <div key={task.id} className=' bg-transparent  border-[1px] p-2 border-second my-5 focus:outline-none rounded-lg'>
        <div
          key={task.id}
          className='max-w-full flex justify-between items-center'
        >
          <p className='text-[25px] font-bold max-w-[700px] overflow-hidden overflow-x-auto'>{task.title}</p>
          <div className='flex items-center gap-2 '>
            
            <label className='container'>
              <input
                type='checkbox'
                onChange={() => checkHandler(task.id)}
                checked={task.completed}
              />
              <div className='checkmark'></div>
            </label>
            <button
              onClick={() => deleteHandler(task.id)}
              className='text-[30px] font-light px-4 border-[1px] border-border rounded-xl'
            >
              -
            </button>
          </div>
        </div>
        <div>
          <p className='font-light text-[15px]'>Starts in : {task.startDate}</p>
          <p className='font-light text-[15px]'>Ends in : {task.endDate}</p>
        </div>
        </div>
      ))
      
  );
}
