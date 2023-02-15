import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    toggle: false,
    cartItems: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCart: (state, action) => {
            state.toggle = action.payload
        },
        populateCart: (state, action) => {
            state.cartItems = action.payload
        },
        updateQuantity: (state, action) => {
            
        }
    }
})

export const {toggleCart, populateCart} = cartSlice.actions;