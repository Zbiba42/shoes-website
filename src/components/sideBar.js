import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import './sideBar.css'
import { Click } from '../App'
import { useDispatch } from 'react-redux'
import { SetStoreMode } from '../redux/StoreSlice'
import jwt_decode from 'jwt-decode'

const SideBar = () => {
  const setFormClicked = useContext(Click)
  const token = sessionStorage.getItem('AccesToken')
  const dispatch = useDispatch()

  return (
    <>
      <div className="sideBar">
        <div className="logoContainer">
          <div
            className="logo"
            style={{
              backgroundImage: 'url(http://localhost:3000/images/logo.png)',
            }}
          ></div>
          <h5>EN</h5>
        </div>
        <div className="explore">
          <h1>Explore </h1>
        </div>

        <div className="links">
          <div className="link coloredLink">
            <Link to="/">
              <i className="fa-solid fa-bars"></i>Categories
            </Link>
            <i className="fa-solid fa-chevron-right"></i>
          </div>

          <div className="link normal">
            <Link to="/">
              <i className="fa-solid fa-tags"></i>Best Offers
            </Link>
            <i className="fa-solid fa-chevron-right"></i>
          </div>

          {token === null ? (
            <div className="link normal">
              <Link
                onClick={() => {
                  setFormClicked(true)
                }}
              >
                <i className="fa-solid fa-store"></i>Sell With Us
              </Link>
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          ) : jwt_decode(token).Store ? (
            <div className="link normal">
              <Link
                onClick={() => {
                  dispatch(
                    SetStoreMode({
                      storeMode : 'seller'
                    })
                  )
                }}
              >
                <i className="fa-solid fa-store"></i>Switch to Seller Mode
              </Link>
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          ) : (
            <div className="link normal">
              <Link to='/createStore'>
                <i className="fa-solid fa-store"></i>Sell With Us
              </Link>
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          )}

          <div className="link normal">
            <Link to="/">
              <i className="fa-solid fa-truck"></i>Order
            </Link>
            <i className="fa-solid fa-chevron-right"></i>
          </div>

          <div className="foot">
            {token ? (
              <div className="link">
                <Link
                  onClick={() => {
                    sessionStorage.removeItem('AccesToken')
                    sessionStorage.removeItem('RefreshToken')
                    Navigate({ to: '/' })
                  }}
                >
                  <i className="fas fa-sign-out-alt"></i>Logout
                </Link>
              </div>
            ) : (
              <div className="link">
                <Link
                  onClick={() => {
                    setFormClicked(true)
                  }}
                >
                  <i className="fas fa-sign-in-alt"></i>Log in
                </Link>
              </div>
            )}

            <div className="link">
              <Link to="/">
                <i className="fa-solid fa-gear"></i> Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SideBar
