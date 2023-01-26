import axios from 'axios'
import React, { useContext } from 'react'


export const Testing = () => {
  const getData = async()=>{
    
    const token = sessionStorage.getItem('AccesToken')
        console.log(await axios.get('http://localhost:5000/testings'
        ))
    }
    
  return (
    <div><button onClick={getData}>Get data</button></div>
  )
}
