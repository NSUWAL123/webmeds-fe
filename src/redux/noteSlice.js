import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
  name: "note",
  initialState: [],
  reducers: {
    fillNote(state, action) {
      return (state = action.payload);
    },
    addNote(state, action) {
      state.push(action.payload);
    },

    deleteNote(state, action) {
      const id = action.payload;
      for (let i = 0; i < state.length; i++) {
        if (state[i]._id === id) {
          state.splice(i, 1);
        }
      }
    },

    editNote(state, action) {
      const data = action.payload;
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
