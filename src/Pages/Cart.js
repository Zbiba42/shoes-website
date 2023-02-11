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
        <div className="FormContainer">
          <h3 className="orders">Delivery information</h3>
          <div className="form">
            <div className="formSlice1">
              <h4>Name</h4>
              <input
                type="text"
                className="input"
                placeholder="Please type your full name"
              />
              <h4>Email</h4>
              <input
                type="email"
                className="input"
                placeholder="Please type your email"
              />
              <h4>State</h4>
              <input
                type="text"
                className="input"
                placeholder="Please type your state"
              />
              <h4>Adress</h4>
              <input
                type="text"
                className="input"
                placeholder="Please type your adress"
              />
            </div>
            <div className="formSlice2">
              <h4>Phone Number</h4>
              <input
                type="text"
                className="input"
                placeholder="Please type your phone number"
              />
              <h4>City</h4>
              <input
                type="text"
                className="input"
                placeholder="Please type your city"
              />
              <h4>ZIP</h4>
              <input
                type="number"
                className="input"
                placeholder="Please type your zip code"
              />
            </div>
          </div>

          <div className="Date">
            <h3 className="title">Schedule Delivery</h3>

            <h4>Date</h4>
            <h4>{'2022-13-2'}</h4>
            <input type="date" name="Date" id="Date" onChange={(e)=>{console.log(e.target.value)}} />
          </div>

          <div className="payement">
            <h3 className="title">Payement Method</h3>
            <input
              type="radio"
              name="Pay"
              id="Online"
              value={'Online Payement'}
            />
            <label htmlFor="Online">Online Payement</label>
            <input
              type="radio"
              name="Pay"
              id="Cash"
              value={'Cash on Delivery'}
            />
            <label htmlFor="Cash">Cash on Delivery</label>
          </div>
        </div>
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
