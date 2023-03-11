import React from 'react'
import './CategoryLink.css'
import { Link } from 'react-router-dom'
export const CategoryLink = ({ category }) => {
  console.log(category)
  return (
    <>
    <Link to={'/category/'+ category.toLowerCase()}>
      <button className="categoryButton">{category}</button>
    </Link>
    </>
  )
}
