import React, { useEffect } from 'react'
import jwtDecode from 'jwt-decode'

export const Cart = () => {
  const GetCart = async () => {
    const { Cart } = jwtDecode(sessionStorage.getItem('AccesToken'))
    console.log(Cart)
  }
  useEffect(()=>{
    GetCart()
  },[])

  return <div>Cart</div>
}
