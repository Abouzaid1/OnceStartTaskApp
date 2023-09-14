// import Navbar from './components/Navbar';
// import Dashboard from "./components/Dashboard";
// import { Routes,Route } from 'react-router-dom';
// import Project from './components/ProjectPage';
// import Addproject from './components/projects/addproject';
// import LoginPage from './components/LoginPage';
// import SignUpPage from './components/SignUpPage';
// import { useEffect } from 'react';
// import Mytasks from './components/DashBoard/Mytasks';
// import CodeCheck from './components/projects/CodeCheck';
// import Friends from './components/projects/Friends';
// import EditTask from './components/projects/EditTask';
// import HomePage from './components/Home/HomePage';

// function App() {
//   useEffect(()=>{
//     document.title = "once$tart"
//   },[])

//   return (
//     <>
//     <Routes>
//     </Routes>
//    <div className="bg-main w-full min-h-[100vh] ">
//     <Routes>
//       <Route path='/:userId' element={<Navbar/>}/>
//       <Route path='/projectPage/:projectId/:userId' element={<Navbar/>}/>
//       <Route path='/addproject/:userId' element={<Navbar/>}/>
//     </Routes>
//     {/* <div className="flex"> */}
//         <div className="w-full ">
//         <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/signup" element={<SignUpPage />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/:userId" element={<Dashboard />} />
//             <Route path="/:userId" element={<Mytasks />} />
//             <Route path="/addproject/:userId" element={<Addproject />} />
//             <Route path="/check/:projectId/:userId" element={<CodeCheck />} />
//             <Route path="/projectPage/:projectId/:userId" element={<Friends />} />
//             <Route path="/projectPage/:projectId/:userId" element={<Project />} />
//             <Route path="/edit/:projectId/:userId/:taskId" element={<EditTask />} />
//         </Routes>
        
//         </div>
//     </div>
//    {/* </div> */}

//     </>
//   )
// }

// export default App
import Navbar from './components/Navbar';
import Dashboard from "./components/Dashboard";
import { Routes,Route } from 'react-router-dom';
import Project from './components/ProjectPage';
import Addproject from './components/projects/addproject';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import { useEffect } from 'react';
import Mytasks from './components/DashBoard/Mytasks';
import CodeCheck from './components/projects/CodeCheck';
import Friends from './components/projects/Friends';
import EditTask from './components/projects/EditTask';
import HomePage from './components/Home/HomePage';
import Sidebar from './components/Sidebar';
import UnEnrolled from './components/projects/UnEnrolled';

function App() {
  useEffect(()=>{
    document.title = "once$tart"
  },[])

  return (
    <>
    <div>
    <Routes>
    </Routes>
   <div className="bg-main w-full min-h-[100vh] ">
    <Routes>
      <Route path='/:userId' element={<Navbar/>}/>
      <Route path='/projectPage/:projectId/:userId' element={<Navbar/>}/>
      <Route path='/addproject/:userId' element={<Navbar/>}/>
    </Routes>
    {/* <div className="flex"> */}
        <div className="w-full ">
        <Routes>
        <Route path='/' element={<HomePage/>}/>
          <Route path='/:userId' element={<Dashboard/>}/>
          <Route path='/newproject/:userId' element={<UnEnrolled/>}/>
          <Route path='/check/:projectId/:userId' element={<CodeCheck/>}/>
          <Route path='/edit/:projectId/:userId/:taskId' element={<EditTask/>}/>
          <Route path='/:userId' element={<Mytasks/>}/>
          <Route path='/projectPage/:projectId/:userId' element={<Project/>}/>
          <Route path='/projectPage/:projectId/:userId' element={<Friends/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/addproject/:userId' element={<Addproject/>}/>
          <Route path='/signup' element={<SignUpPage/>}/>
        </Routes>
        
        </div>
    </div>
   </div>

    </>
  )
}

export default App