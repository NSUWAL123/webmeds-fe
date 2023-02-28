import {createSlice} from "@reduxjs/toolkit";

export const manageProductSlice = createSlice ({
    name: 'manageProduct',
    initialState: [],
    reducers: {
        populateProducts: (state, action) => {
            state = [];
            state = action.payload;
        },
        // addProduct: (state, action) => {

        // },
        deleteProduct: (state, action) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i]._id === action.payload) {
                    state.splice(i, 1);
                }
            }
        }
    }
})

export const {populateProducts, addProduct, deleteProduct} = manageProductSlice.actions;