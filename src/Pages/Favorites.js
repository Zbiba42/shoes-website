import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Product } from '../components/Product'
import './Favorites.css'
export const Favorites = () => {
  const { Favorites } = useSelector((state) => state.Cart_Favorites)
  console.log(Favorites)
  const token = sessionStorage.getItem('AccesToken')
  if (token == null) {
    return <div>{token ? '' : <Navigate to="/" />}</div>
  }
  return (
    <>
      <div className="container">
      <div className="products">
          <h3 className="fav">Favorites</h3>
          <div className="items">
            {Favorites.length > 0 ? (
              Favorites.map((item) => {
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
          
          <br></br>
          <button className="Button">Confirm Order</button>
        </div>
      </div>
    </>
  )
}
