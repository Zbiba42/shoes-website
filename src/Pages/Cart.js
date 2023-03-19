import './Cart.css'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Product } from '../components/Product'
import { OrderForm } from '../components/OrderForm'

export const Cart = () => {
  const { Cart } = useSelector((state) => state.Cart_Favorites)
  const inputRefs = useRef({})
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

  const sumbit = () => {
    const data = Object.keys(inputRefs.current).reduce((acc, key) => {
      acc[key] = inputRefs.current[key].value
      return acc
    }, {})
    console.log(data)
  }

  return (
    <>
      <div className="container">
        <OrderForm inputRefs={inputRefs} />
        <div className="products" style={{ float: 'right' }}>
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
          <button className="Button" onClick={sumbit}>
            Confirm Order
          </button>
        </div>
      </div>
    </>
  )
}
