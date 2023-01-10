import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  createContext,
} from 'react'
import './Form.css'
import LogIn from './logIn'
import SignUp from './SignUp'
import { Click } from '../App'

export const loginToggleContext = createContext(null)

export default function Form() {
  const setFormClicked = useContext(Click)

  const [effect, setEffect] = useState('-80%')
  const [signIn, setsignIn] = useState(true)
  const [signUp, setSignUp] = useState(false)
  const formRef = useRef(null)
  useEffect(() => {
    setEffect('12.5%')

    document.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        setEffect('-80%')
        setTimeout(() => {
          setFormClicked(false)
        }, 700)
      }
    })
  }, [])
  return (
    <>
      <div className="background">
        <div
          className="form-Container"
          style={{ bottom: effect }}
          ref={formRef}
        >
          <button
            className="exit"
            onClick={() => {
              setEffect('-80%')
              setTimeout(() => {
                setFormClicked(false)
              }, 700)
            }}
          >
            X
          </button>
          <loginToggleContext.Provider value={{ setsignIn, setSignUp , setEffect }}>
            {signIn && <LogIn />}
            {signUp && <SignUp />}
          </loginToggleContext.Provider>
        </div>
      </div>
    </>
  )
}
