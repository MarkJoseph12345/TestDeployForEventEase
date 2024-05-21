"use client"

import React, { useEffect, useState } from 'react';
import { withAuth } from '../protection.js';
import dynamic from 'next/dynamic';

const StudentAllEventsPage = dynamic(() => import('./studentAllEventsPage.tsx'), {
    loading: () => <p>Loading...</p>,
});

const AdminAllEventsPage = dynamic(() => import('./adminAllEventsPage.tsx'), {
    loading: () => <p>Loading...</p>,
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
