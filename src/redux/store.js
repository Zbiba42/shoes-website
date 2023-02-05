import {configureStore} from '@reduxjs/toolkit'
import StoreMode from './StoreSlice'

export const store = configureStore({
    reducer:{
        StoreMode : StoreMode
    }
})