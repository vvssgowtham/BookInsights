import React, { useState } from 'react';
import { TextField, Button, Backdrop, CircularProgress } from '@mui/material';
import { Link } from "react-router-dom"
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false); // Add loading state
    const [openBackdrop, setOpenBackdrop] = useState(false); // Add backdrop state
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Set loading state to true
        setOpenBackdrop(true); // Open backdrop

        try {
            const response = await axios.post('https://bookinsights-vvssgowtham.onrender.com/api/auth/signup', formData);
            alert(response.data.message);
            navigate("/")

        } catch (error) {
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false); // Set loading state to false
            setOpenBackdrop(false); // Close backdrop
        }
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Registration Form</h2>
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
                    fullWidth
                    sx={{ mb: 3 }}
                />
                <Button variant="contained" color="primary" type="submit">
                    SignUp
                </Button>
            </form>
            <small style={styles.signupText}>
                Need an account? <Link to="/signup">Login here</Link>
            </small>

            {/* Add backdrop and loading */}
            <Backdrop open={openBackdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

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

export default SignUp;