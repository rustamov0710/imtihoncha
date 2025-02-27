import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API } from "../../utils/config";
import { authActions } from "../../store/authSlice";
import { TextField, Button, Container, Typography, Box, Link } from "@mui/material";
import { uiActions } from "../../store/uiSlice";
import Notification from "../Notification/Notification";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const users = useSelector((state) => state.auth.users);
    const notification = useSelector((state) => state.ui.notification);

    const handleSubmit = async (evt) => {
      evt.preventDefault();
      const newUser = {
          email: emailRef.current.value,
          password: passwordRef.current.value,
      };
  
      try {
          dispatch(
              uiActions.showUi({
                  type: "warning",
                  message: "The request is sending...",
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
                  type: "success",
                  message: "You have successfully registered!",
                  open: true,
              })
          );
  
          navigate("/private");
      } catch (error) {
          dispatch(
              uiActions.showUi({
                  type: "error",
                  message: "Error sending the request!",
                  open: true,
              })
          );
          console.log( error);
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
                    Register
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
                        Register
                    </Button>
                </form>
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    Already have an account?{" "}
                    <Link href="/login" underline="hover">
                        Log in
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Register;
