import { createSlice } from "@reduxjs/toolkit";

export const prescriptionSlice = createSlice({
  name: "prescriptionOrder",
  initialState: {
    prescription: [],
    showPrescription: {
      show: false,
      imgLink: "",
    },
    showRespondModal: {
      show: false,
      id: "",
    },
  },
  reducers: {
    populatePrescriptionOrder: (state, action) => {
      state.prescription = [];
      const prescription = action.payload;

      for (let i = 0; i < prescription.length; i++) {
        if (
          prescription[i].isPriceAccepted === "pending" &&
          prescription[i].deliveryStatus === "pending"
        ) {
        } else {
          state.prescription.push(prescription[i]);
        }
      }
    },
    setShowPrescription: (state, action) => {
      const { setTo, id } = action.payload;
      state.showPrescription.show = setTo;
      for (let i = 0; i < state.prescription.length; i++) {
        if (state.prescription[i]._id === id) {
          state.showPrescription.imgLink = "";
          state.showPrescription.imgLink =
            state.prescription[i].prescriptionPicURL;
        }
      }
    },
    setShowRespondModal: (state, action) => {
      const { setTo, id } = action.payload;
      state.showRespondModal.show = setTo;

      for (let i = 0; i < state.prescription.length; i++) {
        if (state.prescription[i]._id === id) {
          state.showRespondModal.id = id;
        }
      }
    },
    changePrescriptionOrderState: (state, action) => {
      const { id, deliveryStatus } = action.payload;
      for (let i = 0; i < state.prescription.length; i++) {
        if (state.prescription[i]._id === id) {
          state.prescription[i].deliveryStatus = deliveryStatus;
          if (deliveryStatus === "pending") {
            state.prescription.splice(i, 1);
          }
        }
      }
      state.showRespondModal.show = false;
    },
    declinePrescriptionOrderState: (state, action) => {
      const { id } = action.payload;
      for (let i = 0; i < state.prescription.length; i++) {
        if (state.prescription[i]._id === id) {
          state.prescription[i].failed = true;
        }
      }
      state.showRespondModal.show = false;
    },
  },
});

export const {
  populatePrescriptionOrder,
  setShowPrescription,
  setShowRespondModal,
  changePrescriptionOrderState,
  declinePrescriptionOrderState,
} = prescriptionSlice.actions;
