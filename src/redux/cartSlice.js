import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
  cartItems: [],
  orderLine: [],
  orderSummary: { totalItems: 0, orderTotal: 0, discount: 0, grandTotal: 0 },
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
          state.cartItems[i].quantity = action.payload.quantity;
        }
      }
    },
    removeItemFromCart: (state, action) => {
      for (let i = 0; i < state.cartItems.length; i++) {
        if (state.cartItems[i]._id === action.payload.id) {
          state.cartItems.splice(i, 1);
        }
      }
    },
    updateIsCheck: (state, action) => {
      for (let i = 0; i < state.cartItems.length; i++) {
        if (state.cartItems[i]._id === action.payload.id) {
          state.cartItems[i].isCheck = action.payload.isCheck;
        }
      }
    },
    //for orderline
    populateOrderLine: (state, action) => {
      state.orderLine = [];
      let cartIsChecked = action.payload;
      for (let i = 0; i < cartIsChecked.length; i++) {
        if (cartIsChecked[i].isCheck) {
          state.orderLine.push(cartIsChecked[i]);
          state.orderSummary.totalItems += cartIsChecked[i].quantity;
        }
      }
    },
    addOrderLine: (state, action) => {
      state.orderLine.push(action.payload.cartItem);
    },
    removeOrderLine: (state, action) => {
      for (let i = 0; i < state.orderLine.length; i++) {
        if (state.orderLine[i]._id === action.payload.id) {
          state.orderLine.splice(i, 1);
        }
      }
    },
    updateOrderLineQuantity: (state, action) => {
      for (let i = 0; i < state.orderLine.length; i++) {
        if (state.orderLine[i]._id === action.payload.cartId) {
          state.orderLine[i].quantity = action.payload.quantity;
        }
      }
    },
  },
});

export const {
  toggleCart,
  populateCart,
  updateQuantity,
  removeItemFromCart,
  updateIsCheck,
  populateOrderLine,
  addOrderLine,
  removeOrderLine,
  updateOrderLineQuantity,
} = cartSlice.actions;
