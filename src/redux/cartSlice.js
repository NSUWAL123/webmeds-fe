import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
  cartItems: [],
  orderLine: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state, action) => {
      state.toggle = action.payload;
    },
    populateCart: (state, action) => {
        state.cartItems = [];
      state.cartItems = action.payload;
    },
    updateQuantity: (state, action) => {
      for (let i = 0; i < state.cartItems.length; i++) {
        if (state.cartItems[i]._id === action.payload.cartId) {
            state.cartItems[i].quantity = action.payload.quantity
        }
      }
    },
    removeItemFromCart: (state, action) => {
        for (let i = 0; i < state.cartItems.length; i++) {
            if (state.cartItems[i]._id === action.payload.id) {
                state.cartItems.splice(i, 1)
            }
          }
    },
    updateIsCheck: (state, action) => {
        for (let i = 0; i < state.cartItems.length; i++) {
            if (state.cartItems[i]._id === action.payload.id) {
                state.cartItems[i].isCheck = action.payload.isCheck
            }
          }
    }
  },
});

export const { toggleCart, populateCart, updateQuantity, removeItemFromCart, updateIsCheck } = cartSlice.actions;
