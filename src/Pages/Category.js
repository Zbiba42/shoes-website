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
  const gender = useRef()
  const sortBy = useRef()
  let [length, setLength] = useState()
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setendIndex] = useState(10)
  const GetProducts = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/Shoes/categories/${category}?startIndex=${startIndex}&endIndex=${endIndex}&gender=${gender.current.value}`
    )
    setProducts(data.data)
    setLength(data.length)
  }
  const handleApplyButtonClick = () => {
    const pagesize = parseInt(pageSize.current.value)
    setStartIndex(0)
    setendIndex(pagesize)
    GetProducts()
    if (sortBy.current.value == 'price-asc') {
      const SortedProducts = Products.sort((a, b) => {
        return a.price - b.price
      })
      setProducts([...SortedProducts])
    } else if (sortBy.current.value == 'price-desc') {
      const SortedProducts = Products.sort((a, b) => {
        return b.price - a.price
      })
      setProducts([...SortedProducts])
    }
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
          gender={gender}
          sortBy={sortBy}
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

          {endIndex >= length ? (
            <button className="pagination-btn" disabled="true">
              Go next &gt;
            </button>
          ) : (
            <button className="pagination-btn" onClick={onGoNext}>
              Go next &gt;
            </button>
          )}

          {/* <button className="pagination-btn" onClick={onGoNext}>
            Go next &gt;
          </button> */}
        </div>
      </div>
    </>
  )
}
