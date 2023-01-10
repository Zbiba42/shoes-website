import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './sideBar.css'
import { Click, LoggedIn } from '../App'

const SideBar = () => {
  const setFormClicked = useContext(Click)
  const { isLoggedIn } = useContext(LoggedIn)
  console.log(isLoggedIn)
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
              <i className="fa-solid fa-tags"></i>Best Offres
            </Link>
            <i className="fa-solid fa-chevron-right"></i>
          </div>

          <div className="link normal">
            <Link to="/">
              <i className="fa-solid fa-store"></i>Sell With Us
            </Link>
            <i className="fa-solid fa-chevron-right"></i>
          </div>

          <div className="link normal">
            <Link to="/">
              <i className="fa-solid fa-truck"></i>Track Order
            </Link>
            <i className="fa-solid fa-chevron-right"></i>
          </div>

          <div className="foot">
            {isLoggedIn ? (
              <div className="link">
                <Link to={'/account'}
                  
                >
                  <i className="fa-solid fa-user-pen"></i>Account
                </Link>
              </div>
            ) : (
              <div className="link">
                <Link
                  onClick={() => {
                    setFormClicked(true)
                  }}
                >
                  <i className="fa-solid fa-user-pen"></i>Log in
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
