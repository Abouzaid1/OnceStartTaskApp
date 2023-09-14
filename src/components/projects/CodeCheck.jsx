import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchProject, updateProject } from '../Slices/ProjectSlice';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { fetchUser, updateUser } from '../Slices/UsersSlices';
export default function CodeCheck() {
    const dispatch = useDispatch()
    const [projectCode, setProjectCode] = useState("")
    const { userId } = useParams()
    const { projectId } = useParams()
    const projects = useSelector(state => state.project)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {

        dispatch(fetchProject(),fetchUser())
    }
    , [])
    const getCode = (e) => {

        setProjectCode(e.target.value)

    }
    const enroll = (code, id) => {
        if (projectCode === code) {
          let newMember = [];
          let newUser = {};
          let newPeople = {};
          let newProject = [];
      
          user.forEach((item) => {
            if (item.id === userId) {
              newMember = [...item.projectsEnrolled, { id: id }];
              newUser = {
                ...item,
                projectsEnrolled: [...newMember],
              };
      
              projects.forEach((project) => {
                if (project.id === projectId) {
                    newProject = [...project.people, { id: item.id }];
                    newPeople = {
                    ...project,
                    people: [...newProject]
                  };
                }
              });
            }
          });
            dispatch(updateUser(newUser))
            dispatch(updateProject(newPeople))
            navigate(`/${userId}`)
        }
        else{
            alert("Check the code")
        }
    }

    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <>
            <div data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="500">

                <div>
                    <NavLink to={`/newproject/${userId}`}><button className='border-[1px] text-text m-5 border-border rounded-md p-3 hover:brightness-200'>Back</button> </NavLink>
                </div>
                {
                    projects.map(item => {
                        if (item.id === projectId) {
                            return (
                                <div className='w-full'>
                                    <div className='bg-bg border-[1px] border-border w-full md:w-[50%] m-auto my-6 rounded-lg flex items-center justify-between'>
                                        <p className='p-5 text-[25px] font-semibold text-text'>Check <span className='text-[#f5f0cb]'>Code</span></p>
                                    </div>
                                    <div className= 'bg-bg md:w-[50%] m-auto text-[20px] border-[1px] p-5 border-border w-full rounded-lg text-text '>
                                        <label className='text-text font-bold my-6'>{item.name}</label> <br />
                                        <input onChange={(e) => getCode(e)} type="text" placeholder='ex : Project Code ' className='w-full my-5 bg-transparent border-[1px] p-2 border-[#cbcaca77] focus:outline-none rounded-lg' />
                                        <hr className='my-7 opacity-50' />
                                        <button onClick={() => enroll(item.code,item.id)} className='border-[1px] border-border rounded-md p-3 w-full hover:brightness-200'>Check</button>
                                    </div>
                                </div>

                            )
                        }
                    })
                }
            </div>
        </>
    );
}
