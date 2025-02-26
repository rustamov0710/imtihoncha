import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API } from "../../utils/config";
import { authActions } from "../../store/authSlice";
import { TextField, Button, Container, Typography, Box, Link } from "@mui/material";
import { uiActions } from "../../store/uiSlice";
import Notification from "../Notification/Notification";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const notification = useSelector((state) => state.ui.notification);
    const users = useSelector((state) => state.auth.users);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
              
        
                const res = await API.get("users.json");
                if (res.data) {
                    dispatch(authActions.setUsers(res.data));
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, [dispatch]);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const existingUser = users.find(
            (user) => user.email === email && user.password === password
        );

        if (existingUser) {
          dispatch(
            uiActions.showUi({
              type: 'warning',
              message: 'The request is being sent...',
              open: true,
            })
          );
            dispatch(authActions.setUsers(existingUser));
             dispatch(
                          uiActions.showUi({
                            type: 'success',
                            message: 'The request was sent successfully!',
                            open: true,
                          })
                        );
            navigate("/private");
        } else {
             dispatch(
                        uiActions.showUi({
                          type: 'error',
                          message: 'Invalid email or password!',
                          open: true,
                        })
                      );
        }
    };

    return (
        <Container maxWidth="xs">
          {notification && notification.open && (
                  <Notification type={notification.type} message={notification.message} />
                )}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 8,
                    padding: 3,
                    border: '1px solid #ddd',
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: '#fff',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        inputRef={emailRef}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        inputRef={passwordRef}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        Login
                    </Button>
                </form>
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    Don't have an account?{" "}
                    <Link href="/" underline="hover">
                        Register
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;
