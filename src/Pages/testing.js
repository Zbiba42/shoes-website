import axios from 'axios'
import React, { useContext } from 'react'
import jwtDecode from 'jwt-decode'

export const Testing = () => {
  const getData = async()=>{
    
    const {id} = jwtDecode(sessionStorage.getItem('AccesToken'))

        console.log(await axios.get('http://localhost:5000/api/user/Cart'  , id
        ))
    }
    
  return (
    <div><button onClick={getData}>Get data</button></div>
  )
}
