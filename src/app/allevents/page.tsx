"use client"

import React, { useEffect, useState } from 'react';
import { withAuth } from '../protection.js';
import dynamic from 'next/dynamic';
import LoadingPage from '../comps/LoadingPage.tsx';

const StudentAllEventsPage = dynamic(() => import('./studentAllEventsPage.tsx'), {
    loading: () => <LoadingPage />,
});

const AdminAllEventsPage = dynamic(() => import('./adminAllEventsPage.tsx'), {
    loading: () => <LoadingPage />,
});

const AllEvents = () => {
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const role = window.localStorage.getItem('role');
        if (role) {
            setUserRole(role);
        }
    }, []);
    return (
        <div className="max-w-[2000px] relative mx-auto">
            {userRole === 'STUDENT' && <StudentAllEventsPage />}
            {userRole === 'ADMIN' && <AdminAllEventsPage />}
        </div>
    );
};

export default withAuth(AllEvents);
