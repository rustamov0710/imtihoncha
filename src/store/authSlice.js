import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    isAuth: false,
    currentUser: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUsers(state, action) {
            state.users = action.payload;
        },
        registerUser(state, action) {
            state.users.push(action.payload);
            state.currentUser = action.payload;
            state.isAuth = true;
        },
        login(state, action) {
            state.currentUser = action.payload;
            state.isAuth = true;
        },
        logout(state) {
            state.currentUser = null;
            state.isAuth = false;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice;