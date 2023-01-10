import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

import './navBar.css'
import { LoggedIn } from '../App'
import { Token } from '../App'
const NavBar = () => {
  const [categories, setCategories] = useState([])
  const [cartCount, setCatCount] = useState(0)
  const [height, setHeight] = useState('-140px')
  const { isLoggedIn } = useContext(LoggedIn)
  const { token } = useContext(Token)
 
  let store 
  if(token!=null){
    const {Store} = jwt_decode(token)
    store = Store
    console.log(store)
  }

  const getCategories = async () => {
    const { data } = await axios.get('http://localhost:5000/categories')
    const categories = data.data
    setCategories(categories)
  }
  const toggle = () => {
    if (height === '0px') {
      setHeight('-140px')
    } else if (height === '-140px') {
      setHeight('0px')
    }
  }
  useEffect(() => {
    getCategories()
  }, [])
  return (
    <>
      <div className="navBar">
        <div className="menu">
          <select name="" id="">
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
        />
        <i className="fa-solid fa-magnifying-glass"></i>
        <div className="buttons">
          <i className="fa-regular fa-bell"></i>
          <i className="fa-regular fa-heart"></i>
          <i className="fa-solid fa-bag-shopping"></i>
          <p>{cartCount}</p>
        </div>
        <div
          className="profile"
          style={{
            backgroundImage:
              'url(./images/314553714_415021834006234_4264250033766412950_n.jpg)',
          }}
        ></div>
        <i className="fa-solid fa-angle-down" onClick={toggle}></i>
      </div>
        {isLoggedIn && (
          <div className="profileDropDown" style={{ top : height}}>
            <Link to="/">Account Infos</Link>
            {(store == null ) ? (
              <Link to="/createStore">Create Store</Link>
            ) : (
              <Link to="/Store">Store</Link>
            )}
            <Link to="/">Account Infos</Link>
          </div>
        )}
    </>
  )
}

export default NavBar
