import React, { createContext, useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './app.css'
import Main from './Pages/main'
import Shoe from './Pages/Shoe'
import SideBar from './components/sideBar'
import NavBar from './components/navBar'
import Form from './components/Form'
import CreateStore from './Pages/CreateStore'

export const Click = createContext(null)
export const LoggedIn = createContext(null)
export const Token = createContext(null)
export const Store = createContext(null)

export default function App() {
  const [formClicked, setFormClicked] = useState(false)
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [token, setToken] = useState()
  const [hasStore, setHasStore] = useState()
  return (
    <>
      <BrowserRouter>
        <LoggedIn.Provider value={{ isLoggedIn, setisLoggedIn }}>
          <Token.Provider value={{ token, setToken }}>
            <Click.Provider value={setFormClicked}>
              <Store.Provider value={{ hasStore, setHasStore }}>
                <SideBar />
                <NavBar />

                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/shoes/:name" element={<Shoe />} />
                  <Route path="/createStore" element={<CreateStore />} />
                </Routes>
                {formClicked && <Form />}
              </Store.Provider>
            </Click.Provider>
          </Token.Provider>
        </LoggedIn.Provider>
      </BrowserRouter>
    </>
  )
}
