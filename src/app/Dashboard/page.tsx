"use client";

import { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";
import { getRoleFromCookie } from "@/utils/data";
import Loading from "../Loader/Loading";

const Dashboard = () => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      const role = getRoleFromCookie();
      setRole(role);
      setLoading(false);
    };

    fetchRole();
  }, []);

  if (loading) {
    return <Loading/>;
  }

  return (
    <div>
      {role === "ADMIN" && <AdminDashboard />}
      {role === "STUDENT" && <StudentDashboard />}
    </div>
  );
};

export default Dashboard;
