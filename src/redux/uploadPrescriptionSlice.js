import { createSlice } from "@reduxjs/toolkit";

export const uploadPrescriptionSlice = createSlice({
  name: "uploadPrescription",
  initialState: [],
  reducers: {
    populatePrescription: (state, action) => {
      state = [];
      return (state = action.payload);
    },
    initiatePresOrder: (state, action) => {
      for (let i = 0; i < state.length; i++) {
        if (state[i]._id === action.payload._id) {
          state[i] = action.payload;
        }
      }
    },
    declinePrescriptionOrder: (state, action) => {
      const { id } = action.payload;
      // console.log(id);
      for (let i = 0; i < state.length; i++) {
        if (state[i]._id === id) {
          state[i].failed = true;
        }
      }
    },
  },
});

export const {
  populatePrescription,
  initiatePresOrder,
  declinePrescriptionOrder,
} = uploadPrescriptionSlice.actions;
