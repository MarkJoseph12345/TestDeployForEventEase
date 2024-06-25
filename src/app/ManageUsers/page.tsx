"use client";
import { useEffect, useRef, useState } from 'react';
import { User } from '@/utils/interfaces';
import { users } from "@/utils/testdata";
import Sidebar from '../Comps/Sidebar';
import Loading from '../Loader/Loading';

const ManageUsers = () => {
    const [userList, setUserList] = useState<User[]>(users);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [showDepartments, setShowDepartments] = useState<boolean>(false);

    const departments = Array.from(new Set(users.map(user => user.department)));

    const filteredUsers = users.filter(user =>
        (selectedDepartments.length === 0 || selectedDepartments.includes(user.department!)) &&
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUserClick = (user: User) => {
        setSelectedUser(user);
    };

    const handleClosePopup = () => {
        setSelectedUser(null);
    };

    const toggleDepartments = () => {
        setShowDepartments(!showDepartments);
    };

    const handleDepartmentChange = (department: string) => {
        const updatedDepartments = selectedDepartments.includes(department)
            ? selectedDepartments.filter(dep => dep !== department)
            : [...selectedDepartments, department];
        setSelectedDepartments(updatedDepartments);
    };

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDepartments(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 0);
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <Sidebar />
            <div className="mt-2 mx-2 mb-5">
                <p className="text-2xl font-semibold mb-2 tablet:text-3xl">Users</p>
                <div>
                    <div className="flex items-center mb-5">
                        <div className="relative mr-3">
                            <div onClick={toggleDepartments} className="cursor-pointer">
                                <img src="/filter.png" className="h-6 w-6" />
                            </div>
                            {showDepartments && (
                                <div ref={dropdownRef} className="absolute top-10 left-0 bg-white border border-gray-200 shadow-md rounded-md p-2">
                                    <div className="flex items-center justify-between mb-2 flex-col">
                                        <button className="text-sm text-customYellow" onClick={() => setSelectedDepartments([])}>Clear Filter</button>
                                    </div>
                                    <p className="font-semibold">Departments</p>
                                    {departments.map((department, index) => (
                                        <div key={index} className="flex items-center">
                                            <label className="flex items-center cursor-pointer">
                                                <input type="checkbox" checked={selectedDepartments.includes(department!)} onChange={() => handleDepartmentChange(department!)} className="mr-2 cursor-pointer accent-customYellow" />
                                                {department}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" className="block w-full p-2 ps-10 border rounded-md" placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                    </div>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <div key={user.id} className="flex items-center border border-gray-200 rounded-md p-4 mt-2" onClick={() => handleUserClick(user)}>
                                <img src={user.profilePicture} alt={`${user.firstName} ${user.lastName}`} className="w-16 h-16 object-cover rounded-md mr-4" />
                                <div>
                                    <p className="font-semibold">{`${user.firstName} ${user.lastName}`}</p>
                                    <p className="text-gray-600">{user.department}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center ">
                            <img src="no-user-image.png" className="mb-4 w-32 h-32 grayscale" />
                            <p className="text-center">No users match your filters or search term. Please adjust your filters or try a different search term.</p>
                        </div>
                    )}
                </div>
            </div>
            {selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white px-4 rounded-md shadow-md">
                        <p className="sticky top-0 text-end text-customYellow font-bold text-2xl z-10 cursor-pointer" onClick={handleClosePopup}>✖</p>
                        <div className="mt-2 flex flex-col items-center">
                            <img src={selectedUser.profilePicture} alt={`${selectedUser.firstName} ${selectedUser.lastName}`} className="w-32 h-32 object-cover rounded-md mt-2" />
                            <p><strong>Name:</strong> {`${selectedUser.firstName} ${selectedUser.lastName}`}</p>
                            <p><strong>Email:</strong> {selectedUser.username}</p>
                            <p><strong>Department:</strong> {selectedUser.department}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ManageUsers;
