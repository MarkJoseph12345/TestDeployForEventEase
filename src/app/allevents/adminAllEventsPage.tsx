import React, { useState } from 'react';
import AdminSideBar from '../comps/adminSidebar';
import AdminAllEvents from '../comps/adminAllEvents';

const AdminAllEventsPage = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("In Progress");
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
                <AdminSideBar isOpen={true} />
                <img src="/honeyd.png" className="fixed -bottom-2 -right-[1.7rem] w-[20rem] h-[20rem] p-2 ml-[11.4rem] -mt-3" />
            </div>
            <div className='flex flex-col w-full'>
                <div className='bg-customWhite ml-[2rem] flex-1 mt-[2.6rem]' style={{ overflowY: 'auto' }}>
                    <p className='mt-20 mb-[1rem] ml-[4rem] text-2xl font-bold'>All Events!</p>
                    <AdminAllEvents />
                </div>
            </div>
        </div>
    );
}

export default AdminAllEventsPage;
