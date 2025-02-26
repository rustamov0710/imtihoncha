import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        notification: null,
    },
    reducers: {
        showUi(state, action){
            state.notification = {
                type: action.payload.type,
                message: action.payload.message,
                open: action.payload.open
            }
        }
    },
})

export const uiActions = uiSlice.actions;

export default uiSlice;