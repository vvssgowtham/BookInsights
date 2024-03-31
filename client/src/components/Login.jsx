import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
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
        
        try{
            const response = await axios.post('http://localhost:8082/api/auth/login',formData);
            navigate('/');
            alert("Login Successfull");
            sessionStorage.setItem("token",response.data.token);
        }catch(err){
            console.log(err);
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