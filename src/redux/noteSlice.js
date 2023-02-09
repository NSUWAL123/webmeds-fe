import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
  name: "note",
  initialState: [],
  reducers: {
    fillNote(state, action) {
      // console.log(action.payload)
      //always write return, else no data will be returned
      return (state = action.payload);
      // console.log(state)
    },
    addNote(state, action) {
      // console.log(state);
     //console.log("pay" + action.payload)
      state.push(action.payload)
      console.log(action.payload.title)
    },

    deleteNote(state, action) {
        const id = action.payload;
        for (let i = 0; i < state.length; i++) {
            if (state[i]._id === id) {
              state.splice(i, 1)
            }
          }
    },

    editNote(state, action) {
      const data = action.payload;
      console.log("slice bhitrako" + data.id, data.title);
      console.log(state)
      for (let i = 0; i < state.length; i++) {
        if (state[i]._id === data.id) {
          state[i].title = data.title;
          state[i].description = data.description;
        }
      }
    },
  },
});

export const { fillNote, addNote, deleteNote, editNote } = noteSlice.actions;
