import React, { useCallback, useEffect, useState } from "react";
import {
    TextField,
    Box,
    Button
} from "@material-ui/core";

import axios         from "axios";
import {useNavigate} from 'react-router-dom';

function  Login() {
    const navigate = useNavigate();

    const [error, setError]       = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/Users')
        }
    }, [navigate]);

    const handleSelectChange = useCallback(event => {
        switch (event.target.name) {
            case 'email':
                setUserData(
                    {
                        ...userData,
                        email: event.target.value
                    });
                break;
            case 'password':
                setUserData(
                    {
                        ...userData,
                        password: event.target.value
                    });
                break;
            default:
                break;
        }
    }, [userData]);

    const onSubmitHandler = useCallback((event) => {
        event.preventDefault();
        if (userData.email === "" || userData.password === "") {
            setError(true);
            return;
        }
        axios.post(`https://reqres.in/api/login`,  userData)
            .then(res => {
                if (res.data) {
                    localStorage.setItem('token', res.data.token);
                    setUserData({});
                    navigate('/Users')
                }
            });

    }, [userData, navigate]);

    return (
        <Box component='form' onSubmit={onSubmitHandler}>
            <Box mt={2}>
                <TextField label="Email"
                           error={error}
                           variant="outlined"
                           type="email" name="email"
                           onChange={handleSelectChange}
                           value={userData.email}
                />
            </Box>
            <Box mt={2} mb={2}>
                <TextField label="Password"
                           error={error}
                           type="password"
                           variant="outlined"
                           name="password"
                           onChange={handleSelectChange}
                           value={userData.password}
                />
            </Box>
            <Button type="submit" color="primary" variant="outlined">Login</Button>
        </Box>
    );
}

export default Login;
