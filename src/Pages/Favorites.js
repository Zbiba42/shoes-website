import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'



export const Favorites = () => {
  const { Favorites } = useSelector((state) => state.Cart_Favorites)
  console.log(Favorites)
  const token = sessionStorage.getItem('AccesToken')
  if (token == null || jwt_decode(token).Store != null ) {
    return <Navigate to="/" />
  }
  return (
    <>
      <div className="container">
        {Favorites.map((fav) => {
          return <>
          
          </>
        })}
      </div>
    </>
  )
}
