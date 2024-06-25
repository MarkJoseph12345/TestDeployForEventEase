import { User } from "./interfaces";

export const users: User[] = [
    {
        id: 1,
        username: "admin@eventease.com",
        password: "Admin123!",
        firstName: "Admin",
        lastName: "User",
        IdNumber: "001",
        department: "CCS",
        role: "ADMIN"
    },
    {
        id: 2,
        username: "student@eventease.com",
        password: "Student123!",
        firstName: "Student",
        lastName: "User",
        IdNumber: "002",
        department: "CCS",
        role: "STUDENT"
    },
];

import { getCookie } from "./cookies";

export const getRoleFromCookie = (): string | null => {
    const token = getCookie("token");
    if (token) {
        try {
            const user = JSON.parse(token);
            return user.role;
        } catch (error) {
            console.error("Failed to parse token", error);
            return null;
        }
    }
    return null;
};

export const role = getRoleFromCookie();