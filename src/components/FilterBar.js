import React, { useRef } from 'react'
import './FilterBar.css'
export const FilterBar = ({ pageSize, handleApplyButtonClick }) => {
  const sortBy = useRef()
  const genderFilter = useRef()

  return (
    <>
      <div className="product-filter-bar">
        <div className="product-filter-bar__item">
          <label>Sort by price:</label>
          <select ref={sortBy}>
            <option value="price-asc">Lowest to highest</option>
            <option value="price-desc">Highest to lowest</option>
          </select>
        </div>
        <div className="product-filter-bar__item">
          <label>Filter by gender:</label>
          <select defaultValue={'all'} ref={genderFilter}>
            <option value="all">All</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
        <div className="product-filter-bar__item">
          <label>Products per page:</label>
          <select defaultValue={'price-asc'} ref={pageSize}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="40">40</option>
          </select>
        </div>
        <button onClick={handleApplyButtonClick}>Apply</button>
      </div>
    </>
  )
}
