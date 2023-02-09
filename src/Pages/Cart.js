import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const Cart = () => {
  const {Cart} = useSelector(state => state.Cart_Favorites)
  console.log(Cart)
  const token = sessionStorage.getItem('AccesToken')
  if (token == null) {
    return <div>{token ? '' : <Navigate to="/" />}</div>
  }
  return (
    <>
      <div className="container">
        {Cart.map((item) => {
          return <>
            
          </>
        })}
      </div>
    </>
  )
}
