'use client'


import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../api";

interface FormErrors {
    username?: string;
    password?: string;
}

const Login = () => {
    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (token) {
            router.push('/dashboard');
        }
    }, []);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowLoginPassword(!showLoginPassword);
    };

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(API_ENDPOINTS.LOGIN, formData);

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
            router.push('/dashboard')
            setFormData({
                username: "",
                password: "",
            });
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 409) {
                setFormErrors({
                    ...formErrors,
                    username: "Username not found",
                    password: ""
                });
            } else if (axiosError.response?.status === 400) {
                setFormErrors({
                    ...formErrors,
                    username: "",
                    password: "Wrong password"
                });
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="bg-cover bg-no-repeat bg-center bg-[url('/BG.png')] h-full min-h-screen flex items-center lg:justify-end justify-center lg:px-60 ">
            <div className={`h-[25rem] w-[28.125rem] bg-black rounded-2xl lg:p-6 p-4 -mt-[15%]`}>
                <form onSubmit={handleLoginSubmit} method="post" className="bg-customYellow w-full h-full flex flex-col items-center gap-3 justify-between py-3 ">
                    <div className="flex flex-col items-center">
                        <h1 className="text-4xl font-extrabold">WELCOME!</h1>
                        <p className="text-sm font-light">Please enter your Login and Password.</p>
                    </div>
                    <div className="w-4/6 flex flex-col gap-4">
                        <div>
                            <label htmlFor="username" className="font-poppins text-sm font-bold">Username/Email Address<span className="text-red-800">*</span></label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder=" Enter Username/Email Address"
                                className="w-full h-[2.313rem] text-[0.813rem] rounded-2xl border-2 border-black px-2"
                            />
                            {formErrors.username && (
                                <p className="text-red-800 text-xs font-poppins ">
                                    {formErrors.username}
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="font-poppins text-sm font-bold">Password<span className="text-red-800">*</span></label>
                            <div className="relative box-border">
                                <input
                                    type={showLoginPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder=" Enter Password"
                                    className="pr-8 w-full rounded-2xl h-[2.313rem] text-[0.813rem] border-2 border-black px-2"
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-1">
                                    <span className="cursor-pointer -ml-7 -mt-.5" onClick={handleClickShowPassword}>
                                        {showLoginPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </span>
                                </span>
                            </div>
                            {formErrors.password && (
                                <p className="text-red-800 text-xs font-poppins ">
                                    {formErrors.password}
                                </p>
                            )}
                            <span className="text-xs flex justify-end font-light mb-2 mt-.5">Forgot Password?</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <button type="submit" disabled={loading} className={`bg-black text-customYellow w-[110px] h-[35px] ${loading ? 'text-sm' : 'text-xl'}  rounded font-bold mb-5 -mt-4`}> {loading ? "LOGGING IN..." : "LOGIN"}</button>
                        <p className="font-light text-xs font-poppins -mt-5">Don&apos;t have an account? <Link href="/signup" replace className="font-bold cursor-pointer mt-5">SIGN UP</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
