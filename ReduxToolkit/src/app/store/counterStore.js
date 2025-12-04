import {configureStore} from '@reduxjs/toolkit'
import counterReducer from '../../slice/counterSlice'

export const counterStore = configureStore({
    reducer:{
        counter:counterReducer
    }
})