import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUser } from '../Slices/UsersSlices';
import { fetchProject, updateProject } from '../Slices/ProjectSlice';
import Datepicker from 'react-tailwindcss-datepicker';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function EditTask() {
    const [taskText, setTaskText] = useState('');
    const [textareaValue, setTextareaValue] = useState('');
    const { taskId, userId, projectId } = useParams();
    const projects = useSelector((state) => state.project);
    const users = useSelector((state) => state.user);
    const [username, setUsername] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchProject());
        dispatch(fetchUser());
    }, []);

    useEffect(() => {
        users.map((item) => {
            if (item.id === userId) {
                // Get the username
                setUsername(item.username);
            }
        });

        projects.map((project) => {
            if (project.id == projectId) {
                project.tasks.map((task) => {
                    if (task.id == taskId) {
                        setTaskText(task.title);
                        setTextareaValue(task.description); // Set textarea value
                    }
                });
            }
            
        });
    }, []);
    const handleTaskTextChange = (e) => {
        setTaskText(e.target.value);
    };

    const handleTextareaChange = (e) => {
        setTextareaValue(e.target.value);
    };

    const addTask = () => {
        if (taskText !== '') {
            projects.map((project) => {
                if (project.id == projectId) {


                    const taskIndex = project.tasks.findIndex((task) => task.id === taskId);


                    if (taskIndex !== -1) {
                        const updatedTask = {
                            ...project.tasks[taskIndex],
                            title: taskText,
                            startDate: value.startDate,
                            endDate: value.endDate,
                            description: textareaValue,
                            Edited : username
                        };

                        const updatedTasks = [...project.tasks];
                        updatedTasks[taskIndex] = updatedTask;


                        const updatedProject = {
                            ...project,
                            tasks: updatedTasks,
                        };


                        
                        
                        dispatch(updateProject(updatedProject));
                        navigate(`/projectPage/${projectId}/${userId}`)
                        
                    }

                }
            })
        }
        else{
            alert("Write Somthing")
        }
    };

    const [value, setValue] = useState([{ 
        startDate: null,
        endDate: null 
      }]); 
      
      const handleValueChange = (newValue) => {
    
      setValue(newValue); 
      } 

    return (
        <>
            <NavLink to={`/projectPage/${projectId}/${userId}`}>
                <button className="border-[1px] text-text m-5 border-border rounded-md p-3 hover:brightness-200">
                    Back
                </button>
            </NavLink>

            <div className="text-text border-[1px] bg-bg border-border w-full md:w-[80%] m-auto my-6 rounded-lg p-10 px-5">
                <div className="gap-5 flex md:w-[80%] m-auto my-6">
                    <input
                        onChange={(e) => handleTaskTextChange(e)}
                        value={taskText}
                        type="text"
                        className="w-full bg-transparent border-[1px] p-2 border-second focus:outline-none rounded-lg"
                    />
                    <div className="w-[80px]">
                        <Datepicker
                            primaryColor="orange"
                            value={value}
                            onChange={handleValueChange}
                            showShortcuts={true}
                        />
                    </div>
                    <button
                        onClick={() => addTask()}
                        className="text-[30px] font-light px-2 border-[1px] border-border rounded-xl"
                    >
                        +
                    </button>
                </div>
                <div className="gap-5 flex md:w-[80%] m-auto my-6">
                    <textarea
                        onChange={(e) => handleTextareaChange(e)}
                        value={textareaValue}
                        placeholder="Enter task description..."
                        className="w-full bg-transparent border-[1px] p-2 border-second focus:outline-none rounded-lg"
                        id=""
                        cols="30"
                        rows="10"
                    ></textarea>
                </div>
            </div>
        </>
    );
}
