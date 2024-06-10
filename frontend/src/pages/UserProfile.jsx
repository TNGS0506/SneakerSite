import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import "../styles/UserProfile.css"; // Create and import your CSS file for styling

const UserProfile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/api/user/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <h1 className="profile-header">User Profile</h1>
      <div className="profile-details">
        <div className="profile-item">
          <strong>Username:</strong> {user.username}
        </div>
        <div className="profile-item">
          <strong>Email:</strong> {user.email}
        </div>
        {/* Add more user details as needed */}
      </div>
      <button className="profile-logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
