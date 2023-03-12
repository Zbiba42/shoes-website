import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Card from '../components/card'
import './Category.css'
import { FilterBar } from '../components/FilterBar'
export const Category = () => {
  const { category } = useParams()
  const [Products, setProducts] = useState([])
  const pageSize = useRef()
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setendIndex] = useState(10)
  const GetProducts = async () => {
    const { data } = await axios.post(
      'http://localhost:5000/api/Shoes/categories/' + category,
      {
        startIndex: startIndex,
        endIndex: endIndex,
      }
    )
    setProducts(data.data)
  }
  const handleApplyButtonClick = () => {
    const pagesize = parseInt(pageSize.current.value)
    setendIndex(pagesize)
  }
  const onGoNext = () => {
    setStartIndex(startIndex + parseInt(pageSize.current.value))
    setendIndex(endIndex + parseInt(pageSize.current.value))
  }
  const onGoBack = () => {
    setStartIndex(startIndex - parseInt(pageSize.current.value))
    setendIndex(endIndex - parseInt(pageSize.current.value))
  }
  useEffect(() => {
    GetProducts()
    console.log(startIndex)
  }, [endIndex, startIndex])

  return (
    <>
      <div className="container">
        <h2>
          <span>{category[0].toLocaleUpperCase() + category.slice(1)}</span>
          {' Shoes'}
        </h2>
        <FilterBar
          pageSize={pageSize}
          handleApplyButtonClick={handleApplyButtonClick}
        />
        <div className="cards">
          {Products.map((product) => {
            return (
              <Card
                key={product.id}
                image={product.imageURL}
                name={product.name}
                price={product.price}
              />
            )
          })}
        </div>

        <div className="pagination">
          {startIndex == 0 ? (
            <button className="pagination-btn" disabled="true">
              &lt; Go back
            </button>
          ) : (
            <button className="pagination-btn" onClick={onGoBack}>
              &lt; Go back
            </button>
          )}

          <button className="pagination-btn" onClick={onGoNext}>
            Go next &gt;
          </button>
        </div>
      </div>
    </>
  )
}
