import { createSlice } from "@reduxjs/toolkit";

export const userOrderSlice = createSlice({
    name: "adminOrder",
    initialState: [],
    reducers: {
        populateUserOrder: (state, action) => {
            return state = action.payload;
        },
    }
})

export const {populateUserOrder} = userOrderSlice.actions;