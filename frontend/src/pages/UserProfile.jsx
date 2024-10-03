import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserProfile.css";
import { GET_LOGGED_IN_USER } from "../../graphql/queries";
import { useQuery } from "@apollo/client";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_LOGGED_IN_USER);

  useEffect(() => {
    if (data && data.viewer) {
      setUser(data.viewer);
    }
  }, [data]);

  if (loading) return console.log(loading);
  if (error) return console.log(error.message);

  return (
    <div className="profile-container">
      <h1 className="profile-header">Хувийн мэдээлэл</h1>
      <div className="profile-details">
        <div className="profile-item">
          <strong>Хэрэглэгчийн нэр:</strong> {user.username}
        </div>
        <div className="profile-item">
          <strong>Email:</strong> {user.email}
        </div>
        <div className="profile-item">
          <strong>Утасны дугаар:</strong> {user.phoneNumber}
        </div>
      </div>
      <button
        className="profile-logout-button"
        onClick={() => navigate("/EditProfile")}
      >
        <a href="/EditProfile">Өөрчлөх</a>
      </button>
    </div>
  );
};

export default UserProfile;
