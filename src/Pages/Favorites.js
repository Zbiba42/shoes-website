import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

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
        {Favorites.map((fav) => {
          return <>
            
          </>
        })}
      </div>
    </>
  )
}
