import React from 'react'
import { Navigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

export const Account = () => {
  const token = sessionStorage.getItem('AccesToken')
  if (token == null || jwt_decode(token).Store != null ) {
    return <Navigate to="/" />
  }
  return (
    <div>Account</div>
  )
}
