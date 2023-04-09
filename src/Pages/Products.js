import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { FilterBar } from '../components/FilterBar'
import './main.css'

export const Products = () => {
  const [Products, setProducts] = useState([])
  const token = sessionStorage.getItem('AccesToken')
  const getProducts = async () => {
    const { _id } = jwtDecode(sessionStorage.getItem('AccesToken')).Store
    const { data } = await axios.get(
      `http://localhost:5000/api/seller/getProducts?StoreId=${_id}`
    )
    setProducts(data.data)
  }
  const removeProduct = async (item) => {
    const { _id } = jwtDecode(sessionStorage.getItem('AccesToken')).Store
    const { data } = await axios.post(
      'http://localhost:5000/api/seller/removeProduct',
      {
        product: item,
        StoreId: _id,
      }
    )
    console.log(data)
    getProducts()
  }
  useEffect(() => {
    getProducts()
  }, [Products])
  if (token == null) {
    return <div>{token ? '' : <Navigate to="/" />}</div>
  }
  return (
    <>
      <div className="container">
        <h2>
          {'Store '}
          <span>Products</span>
        </h2>
        {/* <FilterBar /> */}
        <Link to={'/Add'}>
          <button style={{ width: '100px', float: 'right' }}>
            Add Product
          </button>
        </Link>
        {Products.map((item) => {
          return (
            <>
              <div
                className="product"
                style={{ width: '700px', margin: '10px auto' }}
              >
                <Link
                  to={`/UpdateShoe/${item._id}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <img src={item.imageURL} alt="" style={{ width: '15%' }} />
                  <h4 className="title">{item.name}</h4>
                  <h5 className="brand">{item.brand}</h5>
                  <h4 className="prix">${item.price}</h4>
                </Link>
                <i class="fa-solid pen Add" onClick={''}></i>
                <i
                  class="fa-solid fa-trash-can delete"
                  onClick={() => {
                    removeProduct(item)
                  }}
                ></i>
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}
