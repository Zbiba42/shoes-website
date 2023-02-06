import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './sideBar.css'
import { Click } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { SetStoreMode } from '../redux/StoreSlice'
import jwt_decode from 'jwt-decode'

const SellerSideBar = () => {
  const setFormClicked = useContext(Click)
  const token = sessionStorage.getItem('AccesToken')
  const dispatch = useDispatch()
  const navigateTo = useNavigate()

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
            <Link
              onClick={() => {
                dispatch(
                  SetStoreMode({
                    storeMode: 'user',
                  })
                )
              }}
              to="/"
            >
              <i className="fa-solid fa-bars"></i>Customer Mode
            </Link>
            <i className="fa-solid fa-chevron-right"></i>
          </div>

          <div className="link normal">
            <Link to="/Account">
              <i className="fa-solid fa-tags"></i>Account infos
            </Link>
            <i className="fa-solid fa-chevron-right"></i>
          </div>

          <div className="link normal">
            <Link to="/Store">
              <i className="fa-solid fa-store"></i>Store
            </Link>
            <i className="fa-solid fa-chevron-right"></i>
          </div>

          <div className="link normal">
            <Link to="/Products">
              <i className="fa-solid fa-truck"></i>Products
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
                    dispatch(
                      SetStoreMode({
                        storeMode: 'user',
                      })
                    )
                  }}
                  to="/"
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

export default SellerSideBar
