import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Progress } from "antd"; // For progress bars
import { FaUsers, FaUserCheck, FaUserTimes } from 'react-icons/fa'; // Icons for stats
import { IoIosCut } from 'react-icons/io'; // Scissors icon
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import styles from "./Admin.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isActive: boolean; // New property for active/inactive status
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const totalHairstyles = 15;

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
        toast.error(err.message || "Failed to fetch users"); // Show error toast
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId: string) => {
    toast.info(`Editing user with ID: ${userId}`);
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
          body: JSON.stringify({ id: userId }), // Sending the userId in the body
        });
  
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
  
        // Update the UI after deletion
        setUsers(users.filter((user) => user._id !== userId));
        toast.success("User deleted successfully"); // Show success toast
      } catch (err: any) {
        toast.error(err.message || "An error occurred while deleting the user"); // Show error toast
      }
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  // Statistics for Pie chart and Progress Bar
  const activeUsers = users.filter(user => user.isActive).length;
  const inactiveUsers = users.length - activeUsers;
  const activePercentage = (activeUsers / users.length) * 100;

  // Pie Chart Data
  const pieData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [activeUsers, inactiveUsers],
        backgroundColor: ["#BC0404", "#333"], // Active in red, inactive in dark gray
        hoverBackgroundColor: ["#9f0303", "#555"],
      },
    ],
  };

  return (
    <div className={styles.adminDashboardContainer}>
      <h1 className={styles.pageTitle}>
        <span className={styles.titleRed}>Style Sync</span> <span className={styles.titleWhite}>Admin Dashboard</span>
      </h1>
      <div className={styles.fullScreenLayout}>
        <section className={styles.overviewSection}>
          <h2 className={styles.overviewTitle}>📊 Overview</h2>
          <div className={styles.statsGrid}>
            {/* Quick Stats Cards */}
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
            
            <div className={styles.statCard}>
              <FaUserTimes size={40} color="#F44336" />
              <h3 className={styles.statValue}>{inactiveUsers}</h3>
              <p className={styles.statLabel}>Inactive Users</p>
            </div>
          </div>

          {/* Progress Bars */}
          <div className={styles.progressBarContainer}>
            <p className={styles.progressTitle}>User Engagement Progress</p>
            <Progress
              percent={activePercentage}
              status="normal"
              strokeColor="#BC0404"
              showInfo={false}
              className={styles.progressBar}
            />
            <p className={styles.progressTitle}>Hairstyle Requests Progress</p>
            <Progress
              percent={Math.min((totalHairstyles / 20) * 100, 100)} // Assuming goal is 20
              status="normal"
              strokeColor="#4CAF50"
              showInfo={false}
              className={styles.progressBar}
            />
          </div>

          {/* Pie Chart */}
          <div className={styles.chartContainer}>
            <Pie data={pieData} options={{ responsive: true }} />
          </div>
        </section>

        {/* User Management Section */}
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

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;
