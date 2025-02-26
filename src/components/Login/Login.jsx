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

    useEffect(() => {
        const fetchUsers = async () => {
            try {
              
        
                const res = await API.get("users.json");
                if (res.data) {
                    dispatch(authActions.setUsers(res.data));
                }
            } catch (error) {
                console.log( error);
            }
        };
        fetchUsers();
    }, [dispatch]);

    const handleSubmit = async (evt) => {
      evt.preventDefault();
      const newUser = {
          email: emailRef.current.value,
          password: passwordRef.current.value,
      };
  
      try {
        dispatch(
                      uiActions.showUi({
                        type: 'warning',
                        message: 'The request is sending...',
                        open: true,
                      })
                    );
          const res = await API.get("users.json");
          const existingUsers = res.data ? res.data : []; 
  
          const updatedUsers = [...existingUsers, newUser];
  
          await API.put("users.json", updatedUsers);
          
          dispatch(authActions.setUsers(updatedUsers));
          dispatch(authActions.registerUser(newUser));
  
          dispatch(
                        uiActions.showUi({
                          type: 'success',
                          message: 'You have successfully logged in!',
                          open: true,
                        })
                      );
          navigate("/private");
      } catch (error) {
          dispatch(
                        uiActions.showUi({
                          type: 'error',
                          message: 'Invalid email or password!',
                          open: true,
                        })
                      );
          console.error("Error updating users:", error);
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
