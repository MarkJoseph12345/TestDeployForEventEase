'use client'
import React from 'react';
import StudentDashboard from './studentDashboard';
import AdminDashboard from './adminDashboard';
import { withAuth } from '../protection.js';

const Dashboard = () => {
  const userRole = localStorage.getItem("role")

  return (
    <div className="max-w-[2000px] relative mx-auto">
      {userRole === 'STUDENT' && <StudentDashboard />}
      {userRole === 'ADMIN' && <AdminDashboard />}
    </div>
  );
};

export default withAuth(Dashboard);