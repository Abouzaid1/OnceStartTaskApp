import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser, updateUser } from '../Slices/UsersSlices'
import { fetchProject, updateProject } from '../Slices/ProjectSlice'
import { useParams } from 'react-router-dom'
import { faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faUserMinus);
export default function Friends() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.user)
    const projects = useSelector(state => state.project)

    const [friends, setFriends] = useState([])
    const [author, setAuthor] = useState([])
    const { userId, projectId } = useParams()

    useEffect(() => {
        dispatch(fetchUser(), fetchProject())
    }, [])
    // useEffect(() => {
    //     dispatch(fetchUser(), fetchProject())
    // }, [projects,users])
    useEffect(() => {
        let one = []
        projects.map(project => {

            if (project.id === projectId) {
                users.map(user => {
                    if (user.id === project.author) {
                        setAuthor(user.username)
                    }
                })
                project.people.map(person => {
                    users.map(user => {
                        if (person.id === user.id) {
                            one.push(user)
                        }
                    })
                    setFriends(one)

                })

            }
        })
    }, [projects, users])
    const removeUser = (id) => {
        let newProject = {}
        let newMembers = []
        projects.map(item => {
                if (item.id == projectId) {
                    if (item.author == userId) {
                        newMembers = item.people.filter(user => user.id != id)
                        newProject = {
                            ...item,
                            people: newMembers
                        }

                        let newUser = {}
                        let newMember = []
                        users.map((item) => { 
                            if (item.id === id) {
                                    
                                    newMember = item.projectsEnrolled.filter(project => project.id != projectId)
                                    newUser = {
                                        ...item,
                                        projectsEnrolled: [...newMember],
                                    }
                            }
                        });
                        dispatch(updateUser(newUser))
                    }else{
                        alert("You are not the owner of this project")
                    }
                }
        })
        dispatch(updateProject(newProject))

        dispatch(fetchUser(), fetchProject())
    }

    return (
        <>
            <div className='lg:w-[300px] bg-bg w-full p-5 h-[fit-content] border-[3px] text-text border-border rounded-[10px]'>
                <p>Owner : </p>
                <div className='p-3 my-5 border-[1px] border-border rounded-[10px]'>

                    <p>{author}</p>
                </div>
                <div>
                    <p>Members :</p>
                </div>
                {
                    friends.map(user => {
                        return (
                            <div key={user.id} className='p-3 my-5 flex item-center justify-between border-[1px] border-border rounded-[10px]'>
                                <p>{user.username}</p>
                                <div>
                                    <button onClick={() => removeUser(user.id)}><FontAwesomeIcon icon={faUserMinus} /></button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
