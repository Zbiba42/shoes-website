import React, { useContext, useRef } from 'react'
import { loginToggleContext } from './Form'
import axios from 'axios'
import { Click } from '../App'
import { useDispatch } from 'react-redux'
import { setCart, setFavorites } from '../redux/Cart_Favorites'
import jwtDecode from 'jwt-decode'

export default function LogIn() {
  const { setsignIn, setSignUp, setEffect } = useContext(loginToggleContext)
  const setFormClicked = useContext(Click)

  const Email = useRef(null)
  const Password = useRef(null)

  const dispatch = useDispatch()

  const SignInHandler = async () => {
    const user = {
      Email: Email.current.value,
      Password: Password.current.value,
    }
    try {
      const response = await axios.post(
        'http://localhost:5000/api/Authentication/LogIn',
        user
      )

      if (response.data.succes) {
        sessionStorage.setItem('AccesToken', response.data.data.accesToken)
        sessionStorage.setItem('RefreshToken', response.data.data.refreshToken)

        dispatch(
          setFavorites({
            Favorites: jwtDecode(response.data.data.accesToken).Loved,
          })
        )
        dispatch(
          setCart({ Cart: jwtDecode(response.data.data.accesToken).Cart })
        )
        setEffect('-80%')
        setTimeout(() => {
          setFormClicked(false)
        }, 700)
      }
    } catch (error) {
      return
    }
  }

  return (
    <>
      <div className="logIn-Container">
        <h2 className="header">Welcome Back</h2>
        <p>Welcome Back! please enter you details.</p>
        <h4>Email</h4>
        <input type="email" placeholder="Enter your Email" ref={Email} />
        <h4>Password</h4>
        <input
          type="password"
          placeholder="Enter your Password"
          ref={Password}
        />
        <br />
        <button className="Sign-btn" onClick={SignInHandler}>
          Sign in
        </button>
        <p className="noAcc">
          Don't have an account ?
          <span
            className="signUp-link"
            onClick={() => {
              setsignIn(false)
              setSignUp(true)
            }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </>
  )
}
