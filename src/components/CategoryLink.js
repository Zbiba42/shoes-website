import React from 'react'
import './CategoryLink.css'
import { Link } from 'react-router-dom'
export const CategoryLink = ({ category }) => {
  return (
    <>
      <Link to={'/category/' + category.toLowerCase()}>
        <button className="categoryButton">{category}</button>
      </Link>
    </>
  )
}
