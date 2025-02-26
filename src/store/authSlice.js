import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
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
        },
        login(state, action) {
            state.currentUser = action.payload;
        },
        logout(state) {
            state.currentUser = null;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice;