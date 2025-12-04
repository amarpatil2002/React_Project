import { createSlice } from "@reduxjs/toolkit";


const counterSlice = createSlice({
    name: "counter",
    initialState: { count: 0 },
    reducers: {
        incrementCount: (state) => {
            if (state.count < 10) {
                state.count++
            }
        },
        decrementCount: (state) => {
            if (state.count > 0) {
                state.count--
            }
        },
        incrementByValue: (state, action) => {
            if (state.count < 10) {
                state.count += action.payload
            }
        }
    }
})

export const { incrementCount, decrementCount, incrementByValue } = counterSlice.actions

export default counterSlice.reducer