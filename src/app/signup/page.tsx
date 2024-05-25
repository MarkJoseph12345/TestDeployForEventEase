'use client'

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../api";
import { useRouter } from "next/navigation";

interface FormData {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    department: string;
    IdNumber: string;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    username?: string;
    department?: string;
    password?: string;
    IdNumber?: string;
}

const SignUp = () => {
    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (token) {
            router.push('/dashboard');
        }
    }, []);

    const router = useRouter();
    const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        department: "CEA",
        IdNumber: ""
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);

    const handleClickShowPassword = () => {
        setShowLoginPassword(!showLoginPassword);
    };

    // Function to validate email format
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Function to validate password
    const isValidPassword = (password: string): boolean => {
        // Regular expression for at least one uppercase letter, one number, and a minimum length of 8, with optional special characters
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    // Function to validate form data
    const validateFormData = () => {
        const errors: FormErrors = {};

        // Validate first name
        if (!formData.firstName.trim()) {
            errors.firstName = "First name is required.";
        }

        // Validate last name
        if (!formData.lastName.trim()) {
            errors.lastName = "Last name is required.";
        }

        // Validate email
        if (!isValidEmail(formData.username)) {
            errors.username = "Please enter a valid email address.";
        }

        if (!formData.lastName.trim()) {
            errors.lastName = "Last name is required.";
        }

        // Validate department
        if (!formData.department) {
            errors.department = "Department is required.";
        }

        // Validate password
        if (!isValidPassword(formData.password)) {
            errors.password = "Your password must be 8 characters with at least one uppercase letter and one number.";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Return whether the form is valid
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        // Validate individual fields and update error state
        const errors = { ...formErrors };

        if (name === "firstName") {
            if (!value.trim()) {
                errors.firstName = "First name is required.";
            } else {
                delete errors.firstName;
            }
        }

        if (name === "lastName") {
            if (!value.trim()) {
                errors.lastName = "Last name is required.";
            } else {
                delete errors.lastName;
            }
        }

        if (name === "username") {
            if (!isValidEmail(value)) {
                errors.username = "Please enter a valid email address.";
            } else {
                delete errors.username;
            }
        }

        if (name === "password") {
            if (!isValidPassword(value)) {
                errors.password = "Your password must be 8 characters with at least one uppercase letter and one number.";
            } else {
                delete errors.password;
            }
        }

        if (name === "department") {
            if (!value) {
                errors.department = "Department is required.";
            } else {
                delete errors.department;
            }
        }

        setFormErrors(errors);
    };


    const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const { value } = e.target;
        setFormData({
            ...formData,
            department: value
        });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);


        const isFormValid = validateFormData();
        if (!isFormValid) {
            setLoading(false);
            return;
        }

        try {

            const response = await axios.post(API_ENDPOINTS.REGISTER, formData);
            await axios.post(API_ENDPOINTS.LOGIN, {
                username: formData.username,
                password: formData.password
            });
            const authToken = response.data.token;
            const role = response.data.user.role;
            const name = response.data.user.firstName;
            const userid = response.data.user.id;
            const department = response.data.user.department;
            window.localStorage.setItem("token", authToken);
            window.localStorage.setItem("role", role);
            window.localStorage.setItem("name", name);
            window.localStorage.setItem("userid", userid);
            window.localStorage.setItem("department", department);
            const defaultImage = 'defaultpic.png';
            fetch(defaultImage)
                .then(response => response.blob())
                .then(blob => {
                    const defaultFormData = new FormData();
                    defaultFormData.append('image', blob, 'defaultpic.png');
                    axios.put(`${API_ENDPOINTS.UPDATE_PROFILE_PICTURE}${userid}`, defaultFormData)
                });
            router.push('/dashboard')
            setFormData({
                username: "",
                password: "",
                firstName: "",
                lastName: "",
                department: "CEA",
                IdNumber: ""
            });
            setFormErrors({});
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="bg-cover bg-no-repeat bg-center bg-[url('/BG.png')] min-h-screen flex items-center lg:justify-start justify-center lg:px-60">
            <div className={`h-fit w-[31.25rem] bg-black rounded-2xl lg:p-6 p-4 `} >
                <form onSubmit={handleSubmit} method="post" className="bg-customYellow h-full w-full flex flex-col items-center justify-between py-3 gap-5 shadow-inner">
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl font-extrabold">CREATE AN ACCOUNT</h1>
                        <p className="font-poppins font-light">Create an account to explore exciting events.</p>
                    </div>
                    <div className="flex justify-between w-5/6">
                        <div className="flex-grow w-full">
                            <label htmlFor="firstName" className="font-poppins text-sm font-bold ">First Name<span className="text-red-800">*</span></label>
                            <input
                                id="firstName"
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="Enter First Name"
                                className="w-40 h-[2.313rem] text-[0.813rem] rounded-2xl border-2 border-black px-2"
                            />
                            {formErrors.firstName && (
                                <p className="text-red-800 text-xs font-poppins ">
                                    {formErrors.firstName}
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="lastName" className="font-poppins text-sm font-bold ">Last Name<span className="text-red-800">*</span></label>
                            <input
                                id="lastName"
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Enter Last Name"
                                className="w-40 h-[2.313rem] text-[0.813rem] rounded-2xl border-2 border-black px-2"
                            />
                            {formErrors.lastName && (
                                <p className="text-red-800 text-xs font-poppins">
                                    {formErrors.lastName}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="w-5/6">
                        <label htmlFor="username" className="font-poppins text-sm font-bold">Username/Email Address<span className="text-red-800">*</span></label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Enter Username/Email Address"
                            className="w-full h-[2.313rem] text-[0.813rem] rounded-2xl border-2 border-black px-2"
                        />
                        {formErrors.username && (
                            <p className="text-red-800 text-xs font-poppins ">
                                {formErrors.username}
                            </p>
                        )}
                    </div>
                    <div className="w-5/6">
                        <label htmlFor="IdNumber" className="font-poppins text-sm font-bold">ID Number</label>
                        <input
                            type="text"
                            name="IdNumber"
                            id="IdNumber"
                            value={formData.IdNumber}
                            onChange={handleInputChange}
                            placeholder="Enter ID Number"
                            className="w-full h-[2.313rem] text-[0.813rem] rounded-2xl border-2 border-black px-2"
                        />
                        {formErrors.IdNumber && (
                            <p className="text-red-800 text-xs font-poppins ">
                                {formErrors.IdNumber}
                            </p>
                        )}
                    </div>
                    <div className="w-5/6">
                        <label htmlFor="department" className="font-poppins text-sm font-bold">Department<span className="text-red-800">*</span></label>
                        <select
                            value={formData.department}
                            onChange={handleDepartmentChange}
                            id="department"
                            className="w-full h-[37px] rounded-2xl border-2 border-black px-2">
                            <option value="CEA">CEA</option>
                            <option value="CMBA">CMBA</option>
                            <option value="CASE">CASE</option>
                            <option value="CNAHS">CNAHS</option>
                            <option value="CCS">CCS</option>
                            <option value="CCJ">CCJ</option>
                        </select>
                        {formErrors.department && (
                            <p className="text-red-800 text-xs font-poppins">
                                {formErrors.department}
                            </p>
                        )}
                    </div>
                    <div className="w-5/6 mb-2">
                        <label htmlFor="password" className="font-poppins text-sm font-bold">Password<span className="text-red-800">*</span></label>
                        <div className="relative box-border">
                            <input
                                type={showLoginPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter Password"
                                style={{ fontSize: '13px' }}
                                className="pr-8 w-full rounded-2xl h-[37px] border-2 border-black px-2" />
                            <span className="absolute inset-y-0 right-0 flex items-center pr-1">
                                <span className="cursor-pointer -ml-7 -mt-.5" onClick={handleClickShowPassword}>
                                    {showLoginPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </span>
                            </span>
                        </div>
                        {formErrors.password && (
                            <p className="text-red-800 text-xs font-poppins">
                                {formErrors.password}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <button type="submit" disabled={loading} className={`bg-black text-customYellow w-[110px] h-[35px] ${loading ? 'text-sm' : 'text-xl'}  rounded-xl font-bold `}> {loading ? "SIGNING UP..." : "SIGN UP"}</button>
                        <p className="font-light text-xs font-poppins">Already have an account? <Link href="/login" replace className="font-bold cursor-pointer">LOGIN</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
