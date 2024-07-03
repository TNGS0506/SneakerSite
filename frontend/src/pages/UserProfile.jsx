import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import "../styles/UserProfile.css"; 
import { server } from "../constants";

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

        const response = await axios.get(server + "api/user/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        console.table(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  console.log(user.id)


  return (
    <div className="profile-container">
      <h1 className="profile-header">Хувийн мэдээлэл</h1>
      <div className="profile-details">
        <div className="profile-item">
          <strong>Хэрэглэгчийн нэр:</strong> {user.username}
        </div>
        <div className="profile-item">
          <strong>Email:</strong> {user.email_address}
        </div>
        <div className="profile-item">
          <strong>Утасны дугаар:</strong> {user.phone_number}
        </div>
      </div>
      <button className="profile-logout-button" onClick={() => navigate("/EditProfile")} >
        <a href='/EditProfile'>Өөрчлөх</a>
      </button>
    </div>
  );
};

export default UserProfile;
