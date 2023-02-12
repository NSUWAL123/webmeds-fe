import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    toggle: false,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCart: (state, action) => {
            state.toggle = action.payload
        }
    }
})

export const {toggleCart} = cartSlice.actions;