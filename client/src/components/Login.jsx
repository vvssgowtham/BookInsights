import React, { useState } from "react";
import { TextField, Button, Backdrop, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false); // State for backdrop loading

    const handleSubmit = async (event) => {
        event.preventDefault();

        setEmailError(false);
        setPasswordError(false);

        if (formData.email === "") {
            setEmailError(true);
        }
        if (formData.password === "") {
            setPasswordError(true);
        }

        try {
            setLoading(true); // Show backdrop loading
            const response = await axios.post(
                "http://localhost:8082/api/auth/login",
                formData
            );
            navigate("/");
            alert("Login Successful");
            sessionStorage.setItem("token", response.data.token);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false); // Hide backdrop loading
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Login Form</h2>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={formData.email}
                    error={emailError}
                />
                <TextField
                    label="Password"
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                    required
                    variant="outlined"
                    color="secondary"
                    type="password"
                    value={formData.password}
                    error={passwordError}
                    fullWidth
                    sx={{ mb: 3 }}
                />
                <Button variant="contained" color="primary" type="submit">
                    Login
                </Button>
            </form>
            <small style={styles.signupText}>
                Need an account? <Link to="/signup">Register here</Link>
            </small>
            <Backdrop open={loading} style={{ zIndex: 9999 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
    },
    heading: {
        marginBottom: "20px"
    },
    signupText: {
        marginTop: "20px"
    }
};

export default Login;