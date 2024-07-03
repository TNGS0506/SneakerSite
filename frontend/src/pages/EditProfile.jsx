import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import "../styles/EditProfile.css";
import { server } from "../constants";

const EditProfile = () => {
  const [user, setUser] = useState({ username: "", email_address: "", phone_number: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
          console.log("No token found, redirecting to login");
          navigate("/login");
          return;
        }

        console.log("Fetching user data with token:", token);

        const response = await axios.get(
          server + "api/user/profile/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data", error);
        handleTokenError(error); // Handle token error here
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleTokenError = (error) => {
    const { response } = error;
    if (response && response.data && response.data.code === "token_not_valid") {
      console.log("Token is invalid or expired. Redirecting to login.");
      localStorage.removeItem(ACCESS_TOKEN); // Clear invalid token
      navigate("/login");
    } else {
      console.error("Unexpected error:", error);
      setError("Unexpected error occurred");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        console.log("No token found, redirecting to login");
        navigate("/login");
        return;
      }

      console.log("Updating user data with token:", token);

      const response = await axios.put(
        server + "api/user/profile/",
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User data updated successfully", response.data);
    
      navigate("/userProfile");
      window.alert("Хэрэглэгчийн мэдээлэл амжилттай шинэчлэгдлээ")
    } catch (error) {
      console.error("Error updating user data", error);
      handleTokenError(error); // Handle token error here
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-profile-container">
      <h1 className="edit-profile-header">Edit Profile</h1>
      {error && <div className="error-message">{error}</div>}
      <form className="edit-profile-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email_address">Email:</label>
          <input
            type="email"
            id="email_address"
            name="email_address"
            value={user.email_address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">Phone:</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={user.phone_number}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="edit-profile-submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
