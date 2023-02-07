import React from 'react'
import { useSelector } from 'react-redux'

export const Cart = () => {
  const {Cart} = useSelector(state => state.Cart_Favorites)
  console.log(Cart)

  return <div>Cart</div>
}
