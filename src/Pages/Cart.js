import React from 'react'
import { useSelector } from 'react-redux'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

export const Cart = () => {
  const {Cart} = useSelector(state => state.Cart_Favorites)
  console.log(Cart)
  const token = sessionStorage.getItem('AccesToken')
  if (token == null || jwt_decode(token).Store != null ) {
    return <Navigate to="/" />
  }

  return <div>Cart</div>
}
