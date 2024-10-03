import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EditProfile.css";
import { UPDATE_USER_PROFILE, GET_LOGGED_IN_USER } from "../../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useApolloClient } from "@apollo/client";

const EditProfile = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const client = useApolloClient();

  // Fetch user data
  const { data, loading, error } = useQuery(GET_LOGGED_IN_USER);

  // Handle loading and error states without affecting hooks
  useEffect(() => {
    if (data?.viewer) {
      setEmail(data.viewer.email || ""); // Ensure that email has a default value
      setPhoneNumber(data.viewer.phoneNumber || ""); // Ensure that phoneNumber has a default value
    }
  }, [data]);

  // Safe access to username
  const username = data?.viewer?.username;

  // Mutation for updating user profile
  const [updateUserProfile, { loading: updating, error: updateError }] =
    useMutation(UPDATE_USER_PROFILE, {
      onCompleted: () => {
        client.refetchQueries({ include: ["GET_LOGGED_IN_USER"] });
        navigate("/userProfile");
        window.location.reload();
      },
      onError: (error) => {
        console.error(error);
      },
    });

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({ variables: { username, email, phoneNumber } });
      window.alert("Хэрэглэгчийн мэдээлэл амжилттай шинэчлэгдлээ");
    } catch (error) {
      console.error("Error updating user data", error);
    }
  };

  // Render loading and error states
  if (loading || updating) return <p>Loading...</p>;
  if (error || updateError)
    return <p>Error: {error?.message || updateError?.message}</p>;

  return (
    <div className="edit-profile-container">
      <h1 className="edit-profile-header">Edit Profile</h1>
      <form className="edit-profile-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            placeholder="Enter new username"
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="email_address">Email:</label>
          <input
            type="email"
            id="email_address"
            name="email_address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter new email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">Phone:</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter new phone number"
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
