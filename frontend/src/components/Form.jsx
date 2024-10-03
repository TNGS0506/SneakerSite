/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";
import { CREATE_USER, GET_TOKEN } from "../../graphql/queries";
import { useMutation } from "@apollo/client";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const name = method === "Login" ? "Login" : "Register";

  // GRAPHQL mutations
  const [createAppUser] = useMutation(CREATE_USER);
  const [tokenAuth] = useMutation(GET_TOKEN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    if (name === "Register") {
      try {
        await createAppUser({ variables: { username, password } });
        setUsername("");
        setPassword("");
        navigate("/Login");
        alert("Successfully registered! Please log in.");
      } catch (err) {
        setErrorMessage(err.message || "Registration failed");
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const { data } = await tokenAuth({ variables: { username, password } });
        localStorage.setItem(ACCESS_TOKEN, data.tokenAuth.token);
        setUsername("");
        setPassword("");
        navigate("/");
        console.log("token: ", localStorage.getItem(ACCESS_TOKEN));
      } catch (err) {
        setErrorMessage(err.message || "Login failed");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        className="form-inputsda"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        className="form-inputsda"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {loading && <LoadingIndicator />}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button className="form-buttonsda hover:bg-blue-700" type="submit">
        {name === "Login" ? "Нэвтрэх" : "Бүртгүүлэх"}
      </button>
    </form>
  );
}

export default Form;
