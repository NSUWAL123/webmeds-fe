import { configureStore } from "@reduxjs/toolkit"
import { noteSlice } from "./noteSlice"
import { userSlice } from "./userSlice"
import { cartSlice } from "./cartSlice"
import { adminOrderSlice } from "./adminOrderSlice"
import { uploadPrescriptionSlice } from "./uploadPrescriptionSlice"

export const store = configureStore({
    reducer: {
        notes: noteSlice.reducer,
        user: userSlice.reducer,
        cart: cartSlice.reducer,
        adminOrder: adminOrderSlice.reducer,
        uploadPrescription: uploadPrescriptionSlice.reducer, 
    },
})