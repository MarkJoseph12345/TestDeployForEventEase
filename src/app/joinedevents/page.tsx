"use client"
import React, { Suspense, useEffect, useState } from 'react';
import StudentSideBar from '../comps/studentSidebar.tsx';
import StudentAllJoinedEventCards from '../comps/studentJoinedEvents.tsx';
import dynamic from 'next/dynamic';
import LoadingPage from '../comps/LoadingPage.tsx';
import { withAuth } from '../protection.js';


const JoinedEvents = dynamic(() => import('./joinedEvents.tsx'), {
    loading: () => <LoadingPage />,
});

const JoinedEventsPage = () => {
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const role = window.localStorage.getItem('role');
        if (role) {
            setUserRole(role);
        }
    }, []);
    return (
        <div className="max-w-[2000px] relative mx-auto">
            {userRole === 'STUDENT' && <JoinedEvents />}
        </div>
    );
}

export default withAuth(JoinedEventsPage);