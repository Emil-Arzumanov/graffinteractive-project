import {createSlice} from "@reduxjs/toolkit";

interface initState {
    number: number
}

const initialState: initState = {
    number: 0,
}

const shipListSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        increment(state) {
            state.number += 1;
        },
        decrement(state) {
            state.number -= 1;
        },
    }
});

export const {
    increment,
    decrement
} = shipListSlice.actions

export default shipListSlice.reducer