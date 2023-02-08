import { createSlice } from "@reduxjs/toolkit"


export const noteSlice = createSlice({
    name: 'note',
    initialState: [],
    reducers: {
        fillNote(state, action) {
            // console.log(action.payload)
            state = action.payload
            // console.log(state)
        },
        addNote(state, action) {
            console.log(state);
        },
        deleteNote(state, action) {

        },
        editNote(state, action) {

        },
    }
})

export const {fillNote, addNote, deleteNote, editNote} =  noteSlice.actions;

