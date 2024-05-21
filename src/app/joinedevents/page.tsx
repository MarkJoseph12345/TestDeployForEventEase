"use client"
import React, { useEffect, useState } from 'react';
import StudentSideBar from '../comps/studentSidebar';
import StudentAllJoinedEventCards from '../comps/studentJoinedEvents';

const StudentAllEventsPage = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("In Progress");


    const [dept, setDept] = useState('')

    useEffect(() => {
        const dept = window.localStorage.getItem('department');
        if (dept) {
            setDept(dept)
        }
    }, []);


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const handleItemClick = (ItemId: React.SetStateAction<string>) => {
        setActiveItem(ItemId);
        toggleDropdown();
    };


    return (
        <div className='flex w-full h-screen ' style={{ overflowY: 'hidden' }}>
            <div className='w-48'>
                <StudentSideBar isOpen={true} />
                <img src="/honeyd.png" className="fixed -bottom-2 -right-[1.7rem] w-[20rem] h-[20rem] p-2 ml-[11.4rem] -mt-3" />
            </div>
            <div className='flex flex-col w-full'>
                <div className='bg-customWhite ml-[2rem] flex-1 mt-[2.6rem]' style={{ overflowY: 'auto' }}>
                    <p className='mt-20 mb-[1rem] ml-[4rem] text-2xl font-bold'>Joined Events!</p>
                    <StudentAllJoinedEventCards />
                </div>
            </div>
        </div>
    );
}

export default StudentAllEventsPage;