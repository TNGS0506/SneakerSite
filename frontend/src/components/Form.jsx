import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import { Link } from 'react-router-dom';
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "Login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
    
        try {
            const res = await api.post(route, { username, password });
    
            if (method === "Login") {
                console.log('Login successful:', res.data);
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                window.alert("Хэрэглэгч амжилттай нэвтэрлээ");
                navigate("/");
            } else {
                console.log('Registration successful:', res.data);
                window.alert("Хэрэглэгч амжилттай бүртгэгдлээ");
                navigate("/login");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            if (error.response) {
                if (error.response.status === 400 && error.response.data.username) {
                    alert(`Тус нэр бүртгэлтэй тул өөр нэр сонгоно уу`);
                } else {
                    alert(`Error: ${error.response.data.detail}`);
                }
            } else {
                alert("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
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
            />
            <input
                className="form-inputsda"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {loading && <LoadingIndicator />}
            <button className="form-buttonsda hover:bg-blue-700" type="submit">
                {name}
            </button>
        </form>
    );
}

export default Form;
