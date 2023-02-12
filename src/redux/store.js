import { configureStore } from "@reduxjs/toolkit"
import { noteSlice } from "./noteSlice"
import { userSlice } from "./userSlice"
import { cartSlice } from "./cartSlice"

export const store = configureStore({
    reducer: {
        notes: noteSlice.reducer,
        user: userSlice.reducer,
        cart: cartSlice.reducer,
    },
})