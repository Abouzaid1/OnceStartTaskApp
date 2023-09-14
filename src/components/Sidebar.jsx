import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTableColumns,faListCheck,faInbox,faBug,faBullseye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faTableColumns,faListCheck,faInbox,faBug,faBullseye); // Add icons to the library


export default function Sidebar() {
  return (
    <>
    <div className='w-[300px] lg:block hidden border-r-[3px] h-[100vh] border-[#27282a]  text-[#959495] fixed'>
        <h1 className='text-[30px] font-bold pt-5 ps-5'>once<span className='text-[#d8d6b3]'>$tart</span></h1>

        <div className=' text-[18px] mt-12 font-bold'>
            <p className='py-4 px-8 cursor-pointer hover:bg-[#27282a] transition-all'><FontAwesomeIcon className='me-3 ' icon="fa-solid fa-table-columns" />DashBoard</p>
            <p className='py-4 px-8 cursor-pointer hover:bg-[#27282a] transition-all'><FontAwesomeIcon className='me-3 '  icon="fa-solid fa-list-check" />My Tasks</p>
            <p className='py-4 px-8 cursor-pointer hover:bg-[#27282a] transition-all'><FontAwesomeIcon className='me-3 '  icon="fa-solid fa-inbox" />Inbox</p>
            <p className='py-4 px-8 cursor-pointer hover:bg-[#27282a] transition-all'><FontAwesomeIcon className='me-3 '  icon="fa-solid fa-bug" />Report</p>
            <p className='py-4 px-8 cursor-pointer hover:bg-[#27282a] transition-all'><FontAwesomeIcon className='me-3 '  icon="fa-solid fa-bullseye" />Goals</p>
        </div>
    </div>
    </>
  )
}
