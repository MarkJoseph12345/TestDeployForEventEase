"use client"

import { ChangeEvent, SetStateAction, useEffect, useRef, useState } from "react";
import StudentSideBar from "../comps/studentSidebar";
import { API_ENDPOINTS } from "../api";
import axios, { AxiosError } from "axios";
import AdminSideBar from "../comps/adminSidebar";
import LoadingPage from "../comps/LoadingPage";
import { withAuth } from "../protection";

interface User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface FormData {
    firstName: string;
    lastName: string;
    password: string;
}


const Profile = () => {
    const [user, setUser] = useState<User>({
        id: 0,
        username: "",
        password: "",
        firstName: "",
        lastName: ""
    });
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [formData, setFormData] = useState<FormData>({
        password: "",
        firstName: "",
        lastName: "",
    });
    const [profilepic, setProfilePic] = useState("")

    useEffect(() => {
        const userid = window.localStorage.getItem('userid');

        const fetchUserById = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.GET_USER_BY_ID + userid);
                setFormData({
                    password: "",
                    firstName: response.data.firstName || "",
                    lastName: response.data.lastName || "",
                });
                setUser(response.data)
                const imgResponse = await axios.get(`${API_ENDPOINTS.GET_PROFILE_PICTURE}${userid}`, {
                    responseType: 'arraybuffer'
                });
                const base64Image = Buffer.from(imgResponse.data, 'binary').toString('base64');
                setProfilePic(`data:image/png;base64,${base64Image}`);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setPageLoading(false);
            }
        };

        fetchUserById();
        const role = window.localStorage.getItem('role');
        setRole(role);
    }, []);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`${API_ENDPOINTS.UPDATE_USER + user!.id}`, formData);
        } finally {
            window.location.reload();
            setLoading(false);
        }
    };

    const isValidPassword = (password: string): boolean => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'password' && value === 'Password...') {
            return;
        }

        if (name === 'password' && !isValidPassword(value)) {
            return;
        }

        setFormData(prevState => {
            const updatedData = {
                ...prevState,
                [name]: value
            };
            return updatedData;
        });
    };

 
    const [profileToUpload, setProfileToUpload] = useState(new FormData());
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileUpload = async () => {
        try {
            await axios.put(`${API_ENDPOINTS.UPDATE_PROFILE_PICTURE}${user.id}`, profileToUpload);
            window.location.reload()
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const reader = new FileReader();
        if (file) {
            profileToUpload.append('image', file)
            reader.readAsDataURL(file);
            handleFileUpload();
          } else {
            setProfileToUpload(new FormData());
          }
    };

    const handleCameraClick = () => {
        if (fileInputRef.current !== null) {
            fileInputRef.current.click();
        }
    };

    if (pageLoading) {
        return <LoadingPage />;
    }
    return (
        <div className="max-w-[125rem]">
            {role === 'STUDENT' && <StudentSideBar isOpen={false} />}
            {role === 'ADMIN' && <AdminSideBar isOpen={false} />}
            <div className="w-full h-[4.688rem] border-b shadow" />
            <div className="flex flex-col w-full items-center justify-center">
                <div className="w-[80%] h-[4.688rem] bg-customYellow rounded-[1.875rem] mt-16" />
                <div className="relative relative flex items-center justify-center -mt-16">
                    <img src={profilepic} alt="Profile Pic" className="object-fill rounded-full  w-[7.813rem] h-[7.813rem]" />
                    <img src="camera.png" className="object-fill absolute bottom-3 right-3 bg-customYellow rounded-full w-[1.875rem] h-[1.875rem] cursor-pointer" onClick={handleCameraClick} />
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden"/>
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
                                <input className="indent-3 w-[18.75rem] h-[2.5rem] border-black border-2 rounded-full" placeholder="First Name..." name="firstName" value={formData.firstName} onChange={handleInputChange}></input>
                            </div>
                            <div className="flex flex-col">
                                <p className="font-poppins">Last Name<span className="text-red-800">*</span></p>
                                <input className="indent-3 w-[18.75rem] h-[2.5rem] border-black border-2 rounded-full" placeholder="Last Name..." name="lastName" value={formData.lastName} onChange={handleInputChange}></input>
                            </div>
                        </div>
                        <div className="flex justify-between w-[90%] self-center">
                            <div className="flex flex-col">
                                <p className="font-poppins">Email<span className="text-red-800">*</span></p>
                                <input className="indent-3 w-[18.75rem] h-[2.5rem] border-black border-2 rounded-full" placeholder="Email..." value={user?.username} disabled></input>
                            </div>
                            <div className="flex flex-col">
                                <p className="font-poppins">Password<span className="text-red-800">*</span></p>
                                <input type="password" className="indent-3 w-[18.75rem] h-[2.5rem] border-black border-2 rounded-full" placeholder="Password..." name="password" value="Password..." onChange={handleInputChange}></input>
                            </div>
                        </div>
                        <button className="bg-customYellow self-end font-bold px-3  rounded-lg ${loading ? 'text-sm' : 'text-xl'}" disabled={loading}>{loading ? "UPDATING..." : "UPDATE"}</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default withAuth(Profile);