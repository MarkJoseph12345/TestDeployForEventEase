"useclient"

import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import CreateEventModal from './createEvent';
import Link from 'next/link';
import axios from 'axios';
import { API_ENDPOINTS } from '../api';


interface User {
  name: string;
  username: string;
  firstName: string;
  lastName: string;
}

const AdminSideBar = ({ isOpen = true }) => {
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [profilepic, setProfilePic] = useState("")

  useEffect(() => {
    const userid = window.localStorage.getItem('userid');

    const fetchUserById = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.GET_USER_BY_ID + userid);
        setUser(response.data)
        const imgResponse = await axios.get(`${API_ENDPOINTS.GET_PROFILE_PICTURE}${userid}`, {
          responseType: 'arraybuffer'
        });
        const base64Image = Buffer.from(imgResponse.data, 'binary').toString('base64');
        setProfilePic(`data:image/png;base64,${base64Image}`);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserById();
  }, []);


  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  }
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const profileClicked = () => {
    setOpenProfile(!openProfile)
  }

  const profileRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (e: { target: any; }) => {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setOpenProfile(false);
    }
  };

  useEffect(() => {
    if (openProfile) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [openProfile]);

  const adminLinks = [
    { name: "Home", href: "/dashboard" },
    { name: "Events", href: "/allevents" },
  ]

  const pathname = usePathname();
  return (
    <div>
      <div className={`fixed  w-[13rem] h-full bg-customYellow transition-all duration-500 ease-in-out ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
        <img src="/honeyc.png" className="fixed w-[35rem] h-[20rem] p-2 ml-[12.4rem] -mt-3 " />
        <div className={`fixed ml-[40rem] w- [1px] h-full bg-customGray transition-all duration-500 ease-in-out ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}></div>
        <button style={{ width: '9rem' }} className={`bg-black mt-[80px] h-[32px]  ml-[30px] -mr-30 rounded-xl flex items-center justify-center transition-all duration-500 ease-in-out ${isVisible ? 'w-full' : 'w-0'}`} onClick={handleModalOpen}>
          <img src="/plusicon.png" alt="Plus Icon" className="w-6 h-6 -ml-2.5" />
          <span className="text-white font-regular  font-poppins text-[13px] ml-[5px]">Create Event</span>
        </button>
        <CreateEventModal visible={isModalOpen} onClose={handleModalClose} />

        <div className='flex flex-col w-full mt-5 items-center gap-1'>
          {adminLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link href={link.href} key={link.name} className={`${isActive ? "bg-white border-r-4 border-black" : ""} p-4 block w-full text-center`}>
                {link.name}
              </Link>
            )
          })}
        </div>
        <p onClick={profileClicked} className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex items-center w-full font-bold text-sm cursor-pointer gap-1"><img src={profilepic} className="object-fill rounded-full w-14 h-14" />{user?.firstName}<br/>{user?.lastName}</p>
        {openProfile && (
          <div ref={profileRef} className='w-[90%] bg-white rounded absolute bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col p-1'>
            <div className='flex items-center'>
              <div>
                <img src={profilepic} className="rounded-full object-fill w-12 h-12" />
              </div>
              <div className="flex flex-col items-center">
                <p>{user?.firstName}</p>
                {/* <p className='text-sm '>email</p> */}
              </div>
            </div>
            <div className='flex flex-col'>
              <Link href="profile" className="cursor-pointer hover:bg-black hover:text-customYellow indent-3 py-1">Profile</Link>
              <p className="cursor-pointer hover:bg-black hover:text-customYellow indent-3 py-1">Delete Account</p>
              <p className="cursor-pointer hover:bg-black hover:text-customYellow indent-3 py-1" onClick={handleLogout}>Sign Out</p>
            </div>
          </div>
        )}
      </div>
      <img src="/menuicon.png" alt="Menu Icon" className="fixed w-13 h-13 p-2 -ml-5 -mt-4 cursor-pointer" onClick={toggleVisibility} />
    </div>
  );
}
export default AdminSideBar;
