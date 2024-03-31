import React, {useState} from 'react';
import { TextField, Button} from '@mui/material';
import { Link } from "react-router-dom"
import axios from 'axios';
 
 
const SignUp = () => {
    const [formData,setFormData] = useState({
        email:'',
        password:''
    })
 
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('http://localhost:8082/api/auth/signup',formData);
        alert(response.data.message);
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
                    Login
                </Button>
            </form>
            <small style={styles.signupText}>
                Need an account? <Link to="/signup">Login here</Link>
            </small>
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