"use client"

import { ChangeEvent, useEffect, useState } from "react";
import StudentSideBar from "../comps/studentSidebar";
import { API_ENDPOINTS } from "../api";
import axios, { AxiosError } from "axios";
import AdminSideBar from "../comps/adminSidebar";

interface User {
    id: number;
    name: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface FormData {
    name: string;
    password: string;
}



const Profile = () => {
    const [user, setUser] = useState<User>();
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        password: "",
        name: "",
    });

    useEffect(() => {
        const userid = window.localStorage.getItem('userid');

        const fetchUserById = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.GET_USER_BY_ID + userid);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUserById();

        const role = window.localStorage.getItem('role');
        setRole(role);
    }, []);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        console.log("To be fixed")
        setLoading(false)
        // try {
        //     const response = await axios.put(`${API_ENDPOINTS.UPDATE_USER+user!.id}`, user);
        //     console.log("Update successful:", response.data);
        // } catch (error) {
        //     const axiosError = error as AxiosError;
        //     console.error("Update failed:", axiosError.response?.data);
        // } finally {
        //     setLoading(false);
        // }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prevState => {
            const updatedData = {
                ...prevState,
                [name]: value
            };
            return updatedData;
        });
    };
    return (
        <div className="max-w-[125rem]">
            {role === 'STUDENT' && <StudentSideBar isOpen={false} />}
            {role === 'ADMIN' && <AdminSideBar isOpen={false} />}
            <div className="w-full h-[4.688rem] border-b shadow" />
            <div className="flex flex-col w-full items-center justify-center">
                <div className="w-[80%] h-[4.688rem] bg-customYellow rounded-[1.875rem] mt-16" />
                <div className="relative relative flex items-center justify-center -mt-16">
                    <img src="defaultpic.png" className="object-fill w-[7.813rem] h-[7.813rem]" />
                    <img src="camera.png" className="object-fill absolute bottom-3 right-3 bg-customYellow rounded-full w-[1.875rem] h-[1.875rem]" />
                </div>
                <div className="flex flex-col items-center justify-center mt-4">
                    <p className="font-bold">{user && `${user.firstName} ${user.lastName}`}</p>
                    <p className="underline text-gray-500">{user && user.username}</p>
                </div>
                <div className="w-[60%] h-[18.75rem] border-gray-200 border-2 rounded-[1.875rem] mt-24">
                    <form onSubmit={handleSubmit} method="post" className="flex flex-col w-full h-full py-4 px-8 justify-between">
                        <p className="font-bold text-xl">Profile Information</p>
                        <div className="flex justify-between w-[90%] self-center">
                            <div className="flex flex-col">
                                <p className="font-poppins">First Name<span className="text-red-800">*</span></p>
                                <input className="indent-3 w-[18.75rem] h-[2.5rem] border-black border-2 rounded-full" placeholder="First Name..."  defaultValue={user?.firstName} onChange={handleInputChange}></input>
                            </div>
                            <div className="flex flex-col">
                                <p className="font-poppins">Last Name<span className="text-red-800">*</span></p>
                                <input className="indent-3 w-[18.75rem] h-[2.5rem] border-black border-2 rounded-full" placeholder="Last Name..." defaultValue={user?.lastName} onChange={handleInputChange}></input>
                            </div>
                        </div>
                        <div className="flex justify-between w-[90%] self-center">
                            <div className="flex flex-col">
                                <p className="font-poppins">Email<span className="text-red-800">*</span></p>
                                <input className="indent-3 w-[18.75rem] h-[2.5rem] border-black border-2 rounded-full" placeholder="Email..." value={user?.username} disabled></input>
                            </div>
                            <div className="flex flex-col">
                                <p className="font-poppins">Password<span className="text-red-800">*</span></p>
                                <input type="password" className="indent-3 w-[18.75rem] h-[2.5rem] border-black border-2 rounded-full" placeholder="Password..." defaultValue="Password..." onChange={handleInputChange}></input>
                            </div>
                        </div>
                        <button className="bg-customYellow self-end font-bold px-3  rounded-lg">UPDATE</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Profile;