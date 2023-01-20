import React, { useContext, useRef  } from 'react'
import { loginToggleContext } from './Form'
import axios from 'axios'
import { Click, LoggedIn , Token } from '../App'



export default function LogIn() {
  const { setsignIn, setSignUp, setEffect } = useContext(loginToggleContext)
  const setFormClicked = useContext(Click)
  const {setisLoggedIn} = useContext(LoggedIn)
  const {setToken} = useContext(Token)
  
  
  const Email = useRef(null)
  const Password = useRef(null)

  const SignInHandler = async () => {
    const user = {
      Email: Email.current.value,
      Password: Password.current.value,
    }
    try {
      
      const response = await axios.post('http://localhost:5000/LogIn', user)
      
      if (response.data.succes) {
        setToken(response.data.data)
        console.log(response.data.data)
        setisLoggedIn(true)
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
        <input
          type="email"
          name=""
          id=""
          placeholder="Enter your Email"
          ref={Email}
        />
        <h4>Password</h4>
        <input
          type="password"
          name=""
          id=""
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
