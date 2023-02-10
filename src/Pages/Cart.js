import './Cart.css'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Product } from '../components/Product'
export const Cart = () => {
  const { Cart } = useSelector((state) => state.Cart_Favorites)
  console.log(Cart)
  const token = sessionStorage.getItem('AccesToken')
  if (token == null) {
    return <div>{token ? '' : <Navigate to="/" />}</div>
  }

  const CalculateTotal = () => {
    let total = 0
    Cart.forEach((item) => {
      total += item.price
    })
    return total
  }
  return (
    <>
      <div className="container">
        <div className="products">
          <h3 className="orders">Order Summary</h3>
          <div className="items">
            {Cart.length > 0 ? (
              Cart.map((item) => {
                return (
                  <>
                    <Product item={item} />
                  </>
                )
              })
            ) : (
              <h2>No items availlable in your cart !</h2>
            )}
          </div>
          <h5 className="total">Subtotal</h5>
          <h5 className="TotalPrice">${CalculateTotal()}</h5>
          <br></br>
          <button className="Button">Confirm Order</button>
        </div>
      </div>
    </>
  )
}
