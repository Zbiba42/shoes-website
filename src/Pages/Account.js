import React from 'react'
import { Navigate } from 'react-router-dom'

export const Account = () => {
  const token = sessionStorage.getItem('AccesToken')
  if (token == null) {
    return <div>{token ? '' : <Navigate to="/" />}</div>
  }
  return (
    <div>Account</div>
  )
}
