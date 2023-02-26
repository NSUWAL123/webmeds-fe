import { createSlice } from "@reduxjs/toolkit";


export const prescriptionSlice = createSlice({
    name: 'prescriptionOrder',
    initialState: {
        prescription: [],
        showPrescription: {
            show: false,
            imgLink: "",
        },
        showRespondModal: false
    },
    reducers: {
        populatePrescriptionOrder: (state, action) => {
            state.prescription = action.payload
        },
        setShowPrescription: (state, action) => {
            const {setTo, id} = action.payload;
            state.showPrescription.show = setTo;
            for (let i = 0; i < state.prescription.length; i++) {
                if (state.prescription[i]._id === id) {
                    state.showPrescription.imgLink = state.prescription[i].prescriptionPicURL
                }
            }
        },
        setShowRespondModal: (state, action) => {
            state.showRespondModal = action.payload
        }
    }
})

export const {populatePrescriptionOrder, setShowPrescription, setShowRespondModal} = prescriptionSlice.actions;

