import React, { useEffect } from 'react'
import jwtDecode from 'jwt-decode'

export const Favorites = () => {
  const GetFav = async () => {
    const { Loved } = jwtDecode(sessionStorage.getItem('AccesToken'))
    console.log(Loved)
  }
  useEffect(()=>{
    GetFav()
  },[])
  return (
    <div>Favorites</div>
  )
}
