"use client"
import { useRef, useState } from 'react';
import Sidebar from '../Comps/Sidebar';

const ProfilePopup = ({ picture, onClose }: any) => {

    const [newPicture, setNewPicture] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const reader = new FileReader();
        if (file) {
            reader.onload = () => {
                setNewPicture(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleClose = () => {
        setNewPicture(null);
        onClose();
    };

    const handleUpload = () => {
        if (newPicture) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-2 rounded-md shadow-md w-11/12 max-h-[95%] overflow-auto relative">
                <p className="sticky top-0 text-end text-gray-500 font-bold text-2xl" onClick={handleClose}>✖</p>
                <img src={newPicture || picture} className="mx-auto w-72 h-72 object-cover" />
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
               <div className="flex flex-col items-center">
               <button onClick={() => fileInputRef.current && fileInputRef.current.click()} className="block bg-customYellow font-poppins font-bold px-4 py-2 rounded-md mt-4">{newPicture ? "Upload Another Image" : "Upload Image"}</button>
                {newPicture && (
                    <button onClick={handleUpload} className="block bg-customYellow font-poppins font-bold px-4 py-2 rounded-md mt-4">Save Profile</button>
                )}
               </div>
            </div>
        </div>
    );
}



const Profile = () => {
    const [clickedProfilePic, setClickedProfilePic] = useState("");

    const handleProfilePicClick = (picture: string) => {
        setClickedProfilePic(picture);
    };

    const handleClosePopup = () => {
        setClickedProfilePic("");
    };
    return (
        <div className="bg-gray-200 h-screen text-center pb-4 smartphone:h-fit tablet:h-screen">
            <Sidebar />
            <div>
                <img src="/defaultpic.png" className="my-4 w-32 rounded-full object-cover object-center mx-auto" onClick={(e) => { handleProfilePicClick("/defaultpic.png") }} />
            </div>
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-gray-700">john.doe@cit.edu</p>
            {clickedProfilePic && <ProfilePopup picture={clickedProfilePic} onClose={handleClosePopup} />}
            <div className="h-fit rounded-2xl mt-4 border-2 p-2 bg-customWhite mx-auto w-fit smartphone:w-9/12 laptop:w-[48rem]">
                <h1 className="text-center text-xl font-bold">Change your account details</h1>
                <form className="mt-2 flex flex-col gap-3">
                    <div className="relative h-11 w-full ">
                        <input placeholder="Email Address" className="peer h-full w-full border-b border-black bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            //value={userForm.username} onChange={handleInputChange} 
                            value={"john.doe@cit.edu"}
                            readOnly
                            name="username" />
                        <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-customYellow after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-customYellow peer-focus:after:scale-x-100 peer-focus:after:border-customYellow peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Email Address
                        </label>
                    </div>
                    <div className="relative h-11 w-full ">
                        <input placeholder="First Name" className="peer h-full w-full border-b border-black bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-black focus:border-customYellow focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            //value={userForm.firstName} onChange={handleInputChange} 
                            defaultValue={"John"}
                            name="firstName" />
                        <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-customYellow after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-customYellow peer-focus:after:scale-x-100 peer-focus:after:border-customYellow peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            First Name
                        </label>
                    </div>
                    <div className="relative h-11 w-full ">
                        <input placeholder="Last Name" className="peer h-full w-full border-b border-black bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            //value={userForm.lastName} onChange={handleInputChange} 
                            defaultValue={"Doe"}
                            name="lastName" />
                        <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-customYellow after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-customYellow peer-focus:after:scale-x-100 peer-focus:after:border-customYellow peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Last Name
                        </label>
                    </div>
                    <div className="relative h-11 w-full ">
                        <input placeholder="ID Number" className="peer h-full w-full border-b border-black bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            //value={userForm.IdNumber} onChange={handleInputChange} 
                            name="IdNumber" />
                        <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-customYellow after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-customYellow peer-focus:after:scale-x-100 peer-focus:after:border-customYellow peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            ID Number
                        </label>
                    </div>
                    <div className="relative h-11 w-full">
                        <input
                            placeholder="Password"
                            type="password"
                            className="peer h-full w-full border-b border-black bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-black focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                            // value={userForm.password}
                            // onChange={handleInputChange}
                            defaultValue={"Password"}
                            name="password" />
                        <label
                            className="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-customYellow after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-customYellow peer-focus:after:scale-x-100 peer-focus:after:border-customYellow peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Password
                        </label>
                    </div>
                    <button type="submit" className="mt-4 bg-customYellow font-bold py-2 px-4 rounded">Update Details</button>
                </form>
            </div>
            {/* {message && (
                <div className={`fixed top-1 right-1 block pl-1 pr-5 text-base leading-5 text-white opacity-95 font-regular border-2 ${message.type === "success" ? "bg-green-500 border-green-900" : "bg-red-500 border-red-900"
                    }`}>
                    <span>{message.text}</span>
                    <span className="absolute right-1" onClick={closeAlert}>✖</span>
                </div>
            )} */}
        </div>
    );
}

export default Profile;
