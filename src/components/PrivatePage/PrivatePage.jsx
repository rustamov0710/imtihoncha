import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/authSlice";
import { Container, Typography, Button, Box } from "@mui/material";
import Notification from "../Notification/Notification";
import { uiActions } from "../../store/uiSlice";

const PrivatePage = () => {
    const dispatch = useDispatch();
    const notification = useSelector((state) => state.ui.notification);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(authActions.logout());
        dispatch(
          uiActions.showUi({
            type: 'success',
            message: 'You have been logged out!',
            open: true,
          })
        );
        navigate("/login");
    };

    return (
        <Container maxWidth="sm">
           {notification && notification.open && (
                  <Notification type={notification.type} message={notification.message} />
                )}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 8,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Private Page
                </Typography>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Box>
        </Container>
    );
};

export default PrivatePage;
