'use client'; // Ensure this component is client-side

import React, { useEffect, useState } from "react";
import { FaUsers } from 'react-icons/fa'; // Icons for stats
import { IoIosCut } from 'react-icons/io'; // Scissors icon
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import { useRouter } from 'next/router'; // For routing
import styles from "./Admin.module.css";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
  role: 'admin' | 'user';
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState<string | null>(null); // Manage dropdown visibility
  const [selectedRole, setSelectedRole] = useState<'admin' | 'user'>('user'); // Store selected role
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Track user authentication
  const router = useRouter();

  const totalHairstyles = 15;

  useEffect(() => {
    // Check if the user is logged in and has admin role
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || user.role !== 'admin') {
      // If not logged in or not an admin, redirect to login
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch users");
        toast.error(err.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  const handleEdit = (userId: string) => {
    // Toggle dropdown for selected user
    setShowDropdown(showDropdown === userId ? null : userId);
    toast.info(`Editing user with ID: ${userId}`);
  };

  const handleRoleChange = async (userId: string) => {
    try {
      const response = await fetch("/api/role", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId, role: selectedRole }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user role");
      }

      const updatedUser = await response.json();
      setUsers(users.map((user) =>
        user._id === userId ? { ...user, role: updatedUser.user.role } : user
      ));

      toast.success("User role updated successfully");
      setShowDropdown(null); // Close the dropdown after updating
    } catch (err: any) {
      toast.error(err.message || "An error occurred while updating the role");
    }
  };

  const handleDelete = async (userId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        const response = await fetch("/api/CRUD", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userId }),
        });

        if (!response.ok) {
          throw new Error("Failed to delete user");
        }

        setUsers(users.filter((user) => user._id !== userId));
        toast.success("User deleted successfully");
      } catch (err: any) {
        toast.error(err.message || "An error occurred while deleting the user");
      }
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.adminDashboardContainer}>
      <h1 className={styles.pageTitle}>
        <span className={styles.titleRed}>Style Sync</span> <span className={styles.titleWhite}>Admin Dashboard</span>
      </h1>
      <div className={styles.fullScreenLayout}>
        <section className={styles.overviewSection}>
          <h2 className={styles.overviewTitle}>📊 Overview</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <FaUsers size={40} color="#BC0404" />
              <h3 className={styles.statValue}>{users.length}</h3>
              <p className={styles.statLabel}>Total Users</p>
            </div>
            <div className={styles.statCard}>
              <IoIosCut size={40} color="#BC0404" />
              <h3 className={styles.statValue}>{totalHairstyles}</h3>
              <p className={styles.statLabel}>Total Hairstyles</p>
            </div>
          </div>
        </section>

        <section className={styles.userManagementSection}>
          <h2 className={styles.userManagementTitle}>👥 User Management</h2>
          <table className={styles.userManagementTable}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>First Name</th>
                <th className={styles.tableHeader}>Last Name</th>
                <th className={styles.tableHeader}>ID</th>
                <th className={styles.tableHeader}>Email</th>
                <th className={styles.tableHeader}>Phone Number</th>
                <th className={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className={styles.tableData}>{user.firstName}</td>
                  <td className={styles.tableData}>{user.lastName}</td>
                  <td className={styles.tableData}>{user._id}</td>
                  <td className={styles.tableData}>{user.email}</td>
                  <td className={styles.tableData}>{user.phoneNumber}</td>
                  <td className={styles.tableData}>
                    <button
                      className={styles.editButton}
                      onClick={() => handleEdit(user._id)}
                    >
                      ✏️ Edit
                    </button>
                    {showDropdown === user._id && (
                      <div className={styles.dropdown}>
                        <button onClick={() => setSelectedRole('admin')}>Admin</button>
                        <button onClick={() => setSelectedRole('user')}>User</button>
                        <button onClick={() => handleRoleChange(user._id)}>
                          Save Role
                        </button>
                      </div>
                    )}
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(user._id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;
