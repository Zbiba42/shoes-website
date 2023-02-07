import { createSlice } from '@reduxjs/toolkit'

const Cart_FavoritesSlice = createSlice({
  name: 'Cart_Favorites',
  initialState: {
    Cart: [],
    Favorites: [],
  },
  reducers: {
    setCart(state, action) {
      state.Cart = action.payload.Cart
    },
    addToCart(state, action) {
      state.Cart.push(action.payload.item)
    },
    setFavorites(state, action) {
      state.Favorites = action.payload.Favorites
    },
    addToFavorites(state, action) {
      state.Favorites.push(action.payload.item)
    },
  },
})

export const { setCart, setFavorites , addToCart , addToFavorites } = Cart_FavoritesSlice.actions

export default Cart_FavoritesSlice.reducer
