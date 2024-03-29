import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

import './navBar.css'
import { useSelector } from 'react-redux'

const NavBar = () => {
  const Navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const searchInput = useRef()
  const searchCategorySelect = useRef()
  const token = sessionStorage.getItem('AccesToken')
  let image =
    'https://thumbs.dreamstime.com/z/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg'
  let store
  let CartLength = useSelector((state) => state.Cart_Favorites.Cart.length)
  let FavoriteLength = useSelector(
    (state) => state.Cart_Favorites.Favorites.length
  )
  if (token != null) {
    console.log(jwt_decode(token))

    const { Store } = jwt_decode(token)
    store = Store
    if (store != null) {
      image = store.image
    }
  }

  const getCategories = async () => {
    const { data } = await axios.get(
      'http://localhost:5000/api/Shoes/categories'
    )
    const categories = data.data
    setCategories(categories)
  }
  const Search = () => {
    console.log('clicked')
    const searchTerm = searchInput.current.value
    const searchCategory = searchCategorySelect.current.value
    console.log(searchTerm)

    Navigate(
      `/search/?searchTerm=${searchTerm}&searchCategory=${searchCategory}`
    )
  }
  useEffect(() => {
    getCategories()
  }, [])
  useEffect(() => {})
  return (
    <>
      <div className="navBar">
        <div className="menu">
          <select name="" id="" ref={searchCategorySelect}>
            <option value="All">All Categories</option>
            {categories.map((category) => {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              )
            })}
          </select>
        </div>

        <input
          className="search"
          type="text"
          name=""
          id=""
          placeholder="Search"
          ref={searchInput}
        />
        <i className="fa-solid fa-magnifying-glass" onClick={Search}></i>
        <div className="buttons">
          <i className="fa-regular fa-bell"></i>
          <p>{0}</p>
          <Link to="/Favorites">
            <i className="fa-regular fa-heart"></i>
          </Link>
          <p>{FavoriteLength}</p>
          <Link to="/Cart">
            <i className="fa-solid fa-bag-shopping"></i>
          </Link>
          <p>{CartLength}</p>
        </div>
        <div
          className="profile"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
      </div>
    </>
  )
}

export default NavBar
