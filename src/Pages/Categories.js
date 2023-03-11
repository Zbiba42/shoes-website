import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { CategoryLink } from '../components/CategoryLink'

export const Categories = () => {
  const [Categories, setCategories] = useState([])
  const AllCategories = async () => {
    const { data } = await axios.get(
      'http://localhost:5000/api/Shoes/categories'
    )

    console.log(data)
    setCategories(data.data)
  }
  useEffect(() => {
    AllCategories()
  }, [])
  return (
    <>
      <div className="container">
        <h2>
           <span>Categories</span>
        </h2>
        {Categories.map((category) => {
          return <CategoryLink category={category} />
        })}
      </div>
    </>
  )
}
