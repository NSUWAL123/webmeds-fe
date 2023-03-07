import { createSlice } from "@reduxjs/toolkit";

export const uploadPrescriptionSlice = createSlice({
    name: "uploadPrescription",
    initialState: [],
    reducers: {
        populatePrescription: (state, action) => {
            state = [];
            return state = action.payload;
        }
    }
})

export const {populatePrescription} = uploadPrescriptionSlice.actions;
