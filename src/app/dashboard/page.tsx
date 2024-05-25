"use client"

import React, { useEffect, useState } from 'react';
import { withAuth } from '../protection.js';
import dynamic from 'next/dynamic';
import LoadingPage from '../comps/LoadingPage.tsx';

const StudentDashboard = dynamic(() => import('./studentDashboard.tsx'), {
    loading: () => <LoadingPage />,
});
const AdminDashboard = dynamic(() => import('./adminDashboard.tsx'), {
    loading: () => <LoadingPage />,
});

const Dashboard = () => {
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const role = window.localStorage.getItem('role');
        if (role) {
            setUserRole(role);
        }
    }, []);
    return (
        <div className="max-w-[2000px] relative mx-auto">
            {userRole === 'STUDENT' && <StudentDashboard />}
            {userRole === 'ADMIN' && <AdminDashboard />}
        </div>
    );
};

export default withAuth(Dashboard);
