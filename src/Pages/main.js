import './main.css'
import Card from '../components/card'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Main = () => {
  const [topProducts, setTopProducts] = useState([])

  const getTop = async () => {
    const { data } = await axios.get('http://localhost:5000/api/Shoes/popular')
    const top = data.data
    setTopProducts(top)
  }
  useEffect(() => {
    getTop()
  }, [])
  return (
    <>
      <Link to={'/category/running'}>
        <div
          className="banner"
          style={{
            backgroundImage: 'url("./images/2bbcfa99737217.5ef9be3dbb9a9.jpg")',
          }}
        ></div>
      </Link>
      <Link to={'/search/?searchTerm=nike&searchCategory=All'}>
        <div
          className="banner2"
          style={{
            backgroundImage:
              'url("./images/0b212f118883485.6092425f50616.jpg")',
          }}
        ></div>
      </Link>
      <div className="container">
        <h2>
          Top <span>Products</span>
        </h2>
        <div className="cards">
          {topProducts.map((product) => {
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
      </div>
    </>
  )
}

export default Main
