import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { addUser, fetchUser } from './Slices/UsersSlices';
import { v4 as uuidv4 } from 'uuid';
export default function SignUpPage() {
    const navigate = useNavigate()
    const [userData,setUserData] = useState({})
    const dispatch = useDispatch()
    const users = useSelector(state => state.user)
    dispatch(fetchUser)
    const [invalid,setInvalid] = useState(false)
    const[value,setValue] = useState("")
    const getUserData = (e) => {
      const name = e.target.name;
      const newValue = e.target.value; 
  
      setUserData((prevUserData) => ({
        "id":uuidv4(),
        ...prevUserData,
        [name]: newValue, 
        "projectsEnrolled":[],
        "tasks":[]
      }));
  
      
      if (name === 'username') {
        const isUsernameTaken = users.some(user => user.username === newValue);
        setInvalid(isUsernameTaken);
      }
      };
      const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!invalid) {
          dispatch(addUser(userData));
          navigate(`/login`);
        } else {
          alert("username already taken")
        }
      };
  return (
    <>
    <div data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="500">
 
    <div>
     <NavLink to="/login"><button className='border-[1px] text-text m-5 border-border rounded-md p-3 hover:brightness-200'>Back</button> </NavLink>
    </div>
    <div className='w-full'>
    <div className='border-[1px] bg-bg border-border w-full md:w-[50%] m-auto my-6 rounded-lg flex items-center justify-between'>
         <p className='p-5 text-[25px] font-semibold text-text'>Sign Up</p>
        </div>
       <div className='md:w-[50%] bg-bg m-auto text-[20px] border-[1px] p-5 border-border w-full rounded-lg text-text '>
        <form method='post' onSubmit={(e)=>handleSubmit(e)}>
                  <label className='text-text font-bold my-6'>First Name</label> <br/>
                  <input required onChange={(e)=>getUserData(e)} name='fName' type="text" placeholder='ex : Ahmed' className='w-full my-5 bg-transparent border-[1px] p-2 border-[#cbcaca77] focus:outline-none rounded-lg'/>
                  <hr  className='my-7 opacity-50'/>
                  <label className='text-text font-bold my-6'>Last Name</label> <br/>
                  <input required onChange={(e)=>getUserData(e)} name='lName' type="text" placeholder='ex : Abouzaid' className='w-full my-5 bg-transparent border-[1px] p-2 border-[#cbcaca77] focus:outline-none rounded-lg'/>
                  <hr  className='my-7 opacity-50'/>
                  <label className='text-text font-bold my-6'>Email</label> <br/>
                  <input required onChange={(e)=>getUserData(e)} name='email' type="text" placeholder='ex : ahmed@gmail.com' className='w-full my-5 bg-transparent border-[1px] p-2 border-[#cbcaca77] focus:outline-none rounded-lg'/>
                  <hr  className='my-7 opacity-50'/>
                  <label pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={value} className='text-text font-bold my-6'>UserName</label> <br/>
                  {
                    invalid ? (<><label className='text-[red] font-black'>Invalid</label></>):(<><label className='text-[green] font-black'>Valid</label></>)
                  }
                  <input required pattern='^[^\s]*$' onChange={(e)=>getUserData(e)} name='username' type="text" placeholder='ex : abouzaid_1' className='w-full my-5 bg-transparent border-[1px] p-2 border-[#cbcaca77] focus:outline-none rounded-lg'/>
                  <p className='text-[15px]'><span className='text-[#ffcd71]'>NOTE : </span> Dont use space</p>
                  <hr  className='my-7 opacity-50'/>
                  <label className='text-text font-bold my-6'>Password</label> <br/>
                  <input pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required onChange={(e)=>getUserData(e)} name='password' type="password" placeholder='ex : 1234567' className='w-full mb-1 mt-5 bg-transparent border-[1px] p-2 border-[#cbcaca77] focus:outline-none rounded-lg'/>
                  <p className='text-[15px]'><span className='text-[#ffcd71]'>NOTE : </span> The Password should contain Uppercase.</p>
                  <p className='text-[15px]'><span className='text-[#ffcd71]'>NOTE : </span> The Password should contain Lowercase.</p>
                  <p className='text-[15px]'><span className='text-[#ffcd71]'>NOTE : </span> The Password should contain Numbers.</p>
                  <p className='text-[15px]'><span className='text-[#ffcd71]'>NOTE : </span> The Password should contain more than 8 characters.</p>
                  <hr  className='my-7 opacity-50'/>
                  <div className='m-auto'>
                  <button type='submit' className='md:w-[70%] w-full mx-1 my-3 mr-6 border-[1px] border-border rounded-md p-3 hover:brightness-200'>Sign Up</button>
                  <NavLink to="/login"><button className='md:w-[20%] w-full mx-1 my-3 border-[1px] border-border rounded-md p-3  hover:brightness-200'>Login</button></NavLink>
                </div>
        </form>
         
         </div>
       </div>
     </div>
    </>
  )
}
