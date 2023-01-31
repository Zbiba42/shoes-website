import React, { createContext, useEffect, useState } from 'react'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import './app.css'
import Main from './Pages/main'
import Shoe from './Pages/Shoe'
import SideBar from './components/sideBar'
import NavBar from './components/navBar'
import Form from './components/Form'
import CreateStore from './Pages/CreateStore'
import axios from 'axios'
import { Testing } from './Pages/testing'
import { Store } from './Pages/Store'

export const Click = createContext(null)

export default function App() {
  const [formClicked, setFormClicked] = useState(false)

  // axios.interceptors.request.use((config) => {
  //   const token = sessionStorage.getItem('AccesToken')
  //   config.headers['Authorization'] = `Bearer ${token}`
  //   return config
  // })
  // axios.interceptors.response.use(
  //   (res) => {
  //     return res
  //   },
  //   (err) => {
  //     if (err.response) {
  //       console.log(err)
  //       if (err.response.status !== 401) {
  //         return Promise.reject(err)
  //       }

  //       const refreshToken = sessionStorage.getItem('RefreshToken')
  //       return axios
  //         .post('http://localhost:5000/refresh', { token: refreshToken })
  //         .then((data) => {
  //           const { refreshToken, accessToken } = data.data.data
  //           console.log(accessToken + ' ' + refreshToken)
  //           sessionStorage.setItem('AccesToken', accessToken)
  //           sessionStorage.setItem('RefreshToken', refreshToken)
  //           console.log('dkchi trefresha')

  //           err.config.headers['Authorization'] = 'Bearer ' + accessToken
  //           return axios(err.config)
  //         })
  //     }
  //   }
  // )
  useEffect(() => {
    console.log('render')
  })

  return (
    <>
      <BrowserRouter>
        <Click.Provider value={setFormClicked}>
          
            <SideBar />
            <NavBar />
            {/* <Link to={'/testing'}>TESTING</Link> */}
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/shoes/:name" element={<Shoe />} />
              <Route path="/createStore" element={<CreateStore />} />
              <Route path="/testing" element={<Testing />} />
              <Route path="/store" element={<Store />} />
            </Routes>
            {formClicked && <Form />}
          
        </Click.Provider>
      </BrowserRouter>
    </>
  )
}
