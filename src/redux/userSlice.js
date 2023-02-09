import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        populateUser: (state, action) => {
            return (state = action.payload)
            // console.log(state)
        },
        updateAddress: (state, action) => {
            
        }
    }
})

export const {populateUser} = userSlice.actions;