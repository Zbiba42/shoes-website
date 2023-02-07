import React from 'react'
import { useSelector } from 'react-redux'
import './Favorites.css'

export const Favorites = () => {
  const { Favorites } = useSelector((state) => state.Cart_Favorites)
  console.log(Favorites)
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
