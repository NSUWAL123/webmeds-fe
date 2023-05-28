import { createSlice } from "@reduxjs/toolkit";

export const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState: [],
  reducers: {
    populateAdminOrder: (state, action) => {
      return (state = action.payload);
    },
    changeAdminOrderState: (state, action) => {
      const { id, deliveryStatus } = action.payload;
      for (let i = 0; i < state.length; i++) {
        if (state[i]._id === id) {
          state[i].deliveryStatus = deliveryStatus;
        }
      }
    },
    declineOrderState: (state, action) => {
      const { id } = action.payload;
      for (let i = 0; i < state.length; i++) {
        if (state[i]._id === id) {
          state[i].failed = true;
        }
      }
    },
  },
});

export const { populateAdminOrder, changeAdminOrderState, declineOrderState } =
  adminOrderSlice.actions;
