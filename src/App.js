import React, { createContext, useEffect, useState } from 'react'

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import './app.css'
import Main from './Pages/main'
import Shoe from './Pages/Shoe'
import SideBar from './components/sideBar'
import SellerSideBar from './components/SellerSideBar'
import NavBar from './components/navBar'
import Form from './components/Form'
import CreateStore from './Pages/CreateStore'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Testing } from './Pages/testing'
import { Store } from './Pages/Store'
import { useDispatch, useSelector } from 'react-redux'
import { Account } from './Pages/Account'
import { Products } from './Pages/Products'
import { Cart } from './Pages/Cart'
import { Favorites } from './Pages/Favorites'
import { Categories } from './Pages/Categories'
import { Category } from './Pages/Category'
import { Search } from './Pages/Search'
import jwtDecode from 'jwt-decode'
import { setCart, setFavorites } from './redux/Cart_Favorites'
import { SetStoreMode } from './redux/StoreSlice'
import { AddProduct } from './Pages/AddProduct'
import { UpdateShoe } from './Pages/UpdateShoe'
export const Click = createContext(null)

export default function App() {
  const [formClicked, setFormClicked] = useState(false)
  const [Location, setLocation] = useState('http://localhost:3000/')
  const StoreMode = useSelector((state) => state.StoreMode.storeMode)
  const dispatch = useDispatch()
  axios.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('AccesToken')
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  })
  axios.interceptors.response.use(
    (res) => {
      return res
    },
    (err) => {
      if (err.response) {
        if (err.response.status !== 401) {
          return Promise.reject(err)
        }

        const refreshToken = sessionStorage.getItem('RefreshToken')

        return axios
          .post('http://localhost:5000/api/Authentication/refresh', {
            token: refreshToken,
          })
          .then((data) => {
            const { refreshToken, accessToken } = data.data.data
            console.log('refresh -> ' + refreshToken)
            sessionStorage.setItem('AccesToken', accessToken)
            sessionStorage.setItem('RefreshToken', refreshToken)

            err.config.headers['Authorization'] = 'Bearer ' + accessToken
            return axios(err.config)
          })
      }
    }
  )
  useEffect(() => {
    setLocation(window.location.href)
    const accesToken = sessionStorage.getItem('AccesToken')
    if (accesToken) {
      dispatch(setCart({ Cart: jwtDecode(accesToken).Cart }))
      dispatch(
        setFavorites({
          Favorites: jwtDecode(accesToken).Loved,
        })
      )
    }
  }, [])
  useEffect(() => {
    if (Location == 'http://localhost:3000/Store') {
      dispatch(
        SetStoreMode({
          storeMode: 'seller',
        })
      )
    }
  })

  return (
    <>
      <BrowserRouter>
        <Click.Provider value={setFormClicked}>
          <ToastContainer />
          {StoreMode === 'user' ? <SideBar /> : <SellerSideBar />}
          {/* {Location == 'http://localhost:3000/Store' ? '' : <NavBar />} */}
          <NavBar />
          {/* <Link to={'/testing'}>TESTING</Link> */}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/shoes/:name" element={<Shoe />} />
            <Route path="/createStore" element={<CreateStore />} />
            <Route path="/testing" element={<Testing />} />
            <Route path="/Store" element={<Store />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Favorites" element={<Favorites />} />
            <Route path="/Categories" element={<Categories />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/search" element={<Search />} />
            <Route path="/Add" element={<AddProduct />} />
            <Route path="/UpdateShoe/:Id" element={<UpdateShoe />} />
          </Routes>
          {formClicked && <Form />}
        </Click.Provider>
      </BrowserRouter>
    </>
  )
}
