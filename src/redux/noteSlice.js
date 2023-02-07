import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    notes: [],
}

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        addNote: (state, action) => {
            state.notes.push(action.payload)
        }
    }
})