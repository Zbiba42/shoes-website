import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import Card from '../components/card'
import './Category.css'
import { FilterBar } from '../components/FilterBar'
export const Search = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchTerm = searchParams.get('searchTerm')
  const searchCategory = searchParams.get('searchCategory')

  const [Products, setProducts] = useState([])

  const gender = useRef()
  const sortBy = useRef()

  const GetProducts = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/Shoes/shoe/search?searchTerm=${searchTerm}&searchCategory=${searchCategory}&searchGender=${gender.current.value}&sort=${sortBy.current.value}`
    )
    setProducts(data.data)
  }
  const handleApplyButtonClick = () => {
    if (gender.current.value !== 'all') {
      GetProducts()
    }

    if (sortBy.current.value == 'price-asc') {
      GetProducts()
    } else if (sortBy.current.value == 'price-desc') {
      GetProducts()
    }
  }
  //   const onGoNext = () => {
  //     setStartIndex(startIndex + parseInt(pageSize.current.value))
  //     setendIndex(endIndex + parseInt(pageSize.current.value))
  //   }
  //   const onGoBack = () => {
  //     setStartIndex(startIndex - parseInt(pageSize.current.value))
  //     setendIndex(endIndex - parseInt(pageSize.current.value))
  //   }
  useEffect(() => {
    GetProducts()
  }, [searchTerm, searchCategory])

  return (
    <>
      <div className="container">
        <h2>
          <span>Search</span>
          {' results'}
        </h2>
        <FilterBar
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

        {/* <div className="pagination">
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
        </div> */}
      </div>
    </>
  )
}
