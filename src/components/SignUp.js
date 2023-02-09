import React, { useContext, useRef } from 'react'
import { loginToggleContext } from './Form'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function SignUp() {
  const { setsignIn, setSignUp } = useContext(loginToggleContext)

  const FullName = useRef(null)
  const Email = useRef(null)
  const Password = useRef(null)

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }
  const SignUpHandler = async () => {
    if (validateEmail(Email.current.value)) {
      const user = {
        Fullname: FullName.current.value,
        Email: Email.current.value,
        Password: Password.current.value,
      }
      const response = await axios.post(
        'http://localhost:5000/api/Authentication/SignUp',
        user
      )

      if (response.data.succes) {
        setsignIn(true)
        setSignUp(false)
        toast.success('Account Created Successfully !', {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      if (response.data.error) {
        toast.error(response.data.error, {
          position: toast.POSITION.TOP_CENTER,
        })
      }
    } else {
      toast.error('Unvalid email !', {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  }

  return (
    <>
      <div className="logIn-Container">
        <h2 className="header">Create your account</h2>
        <p>Enter the fields below to get started</p>
        <h4>Full name</h4>
        <input
          type="email"
          name=""
          id=""
          placeholder="Enter your Full name"
          ref={FullName}
        />
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
        />{' '}
        <br />
        <button className="Sign-btn" onClick={SignUpHandler}>
          Sign Up
        </button>
        <p className="noAcc">
          Already have an account ?{' '}
          <span
            className="signUp-link"
            onClick={() => {
              setsignIn(true)
              setSignUp(false)
            }}
          >
            Sign In
          </span>
        </p>
      </div>
    </>
  )
}
