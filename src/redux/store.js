import { configureStore } from "@reduxjs/toolkit"
import { noteSlice } from "./noteSlice"
import { userSlice } from "./userSlice"

export const store = configureStore({
    reducer: {
        notes: noteSlice.reducer,
        user: userSlice.reducer,
    },
})