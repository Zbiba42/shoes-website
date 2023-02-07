import { configureStore } from '@reduxjs/toolkit'
import StoreMode from './StoreSlice'
import Cart_Favorites from './Cart_Favorites'

export const store = configureStore({
  reducer: {
    StoreMode: StoreMode,
    Cart_Favorites : Cart_Favorites
  },
})
