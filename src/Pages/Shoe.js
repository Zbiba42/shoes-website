import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Shoe.css'

const Shoe = () => {
  const { name } = useParams()
  const [shoeData, setShoeData] = useState()
  const getShoe = async () => {
    const { data } = await axios.get(`http://localhost:5000/shoes/${name}`)
    setShoeData(data.data)
  }

  useEffect(() => {
    getShoe()
  }, [])

  if (shoeData != undefined) {
    return (
      <>
        <div className="shoeContainer">
          <div className="imgContainer">
            <img src={shoeData.imageURL} alt="image unavailable" />
          </div>
          <div className="infoContainer">
            <h4 className="Shoecategory">
              {shoeData.category.toLowerCase()} shoes
            </h4>
            <h1 className="ShoeName">{shoeData.name}</h1>
            <h3 className="ShoePrice">{shoeData.price} $</h3>
            <h4 className="ShoeLeft">Items Left :{shoeData.items_left}</h4>

            <h4 className="SelectSize">Select Size</h4>
            <div className="SizeSelection">
              <div className="size">
                <h4>M 10 / W 11.5</h4>
              </div>
              <div className="size">
                <h4>M 10 / W 11.5</h4>
              </div>
              <div className="size">
                <h4>M 10 / W 11.5</h4>
              </div>
            </div>
            <div className="buttonsContainer">
              <div className="button">
                <h4>
                  Add to Cart <i class="fa-solid fa-cart-shopping"></i>
                </h4>
              </div>

              <div className="button">
                <h4>
                  Favorite <i class="fa-solid fa-heart"></i>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Shoe
