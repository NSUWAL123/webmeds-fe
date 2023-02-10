import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        populateUser: (state, action) => {
            return (state = action.payload)
        },
        addAddress: (state, action) => {   
            state.billingAddress = action.payload
        },
        updateUser: (state, action) => {
            let data = action.payload
            state.name = data.name;
            state.mobile = data.mobile;
        }
    }
})

export const {populateUser, addAddress, updateUser} = userSlice.actions;