import React, { useRef } from 'react'
import './FilterBar.css'
export const FilterBar = ({
  pageSize,
  gender,
  handleApplyButtonClick,
  sortBy,
}) => {
  return (
    <>
      <div className="product-filter-bar">
        <div className="product-filter-bar__item">
          <label>Sort by price:</label>
          <select defaultValue={'no sort'} ref={sortBy}>
            <option value="no sort">no sort</option>
            <option value="price-asc">Lowest to highest</option>
            <option value="price-desc">Highest to lowest</option>
          </select>
        </div>
        <div className="product-filter-bar__item">
          <label>Filter by gender:</label>
          <select defaultValue={'all'} ref={gender}>
            <option value="all">All</option>
            <option value="women">Female</option>
            <option value="men">Male</option>
            <option value="kids">Kids</option>
          </select>
        </div>
        <div className="product-filter-bar__item">
          <label>Products per page:</label>
          <select defaultValue={10} ref={pageSize}>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <button onClick={handleApplyButtonClick}>Apply</button>
      </div>
    </>
  )
}
