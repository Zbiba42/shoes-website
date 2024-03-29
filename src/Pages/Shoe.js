import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Shoe.css'
import { toast } from 'react-toastify'
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { addToCart, addToFavorites } from '../redux/Cart_Favorites'

const Shoe = () => {
  const { name } = useParams()
  const [shoeData, setShoeData] = useState()
  const dispatch = useDispatch()

  const getShoe = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/Shoes/shoe/${name}`
    )
    setShoeData(data.data)
  }
  const addtoCart = async () => {
    const token = sessionStorage.getItem('AccesToken')
    const { id } = jwt_decode(token)

    dispatch(addToCart({ item: shoeData }))

    const response = await axios.post(
      'http://localhost:5000/api/user/addToCart',
      {
        id: id,
        item: shoeData,
      }
    )
    if (response.status === 200) {
      toast.success('Item added to cart successfully !', {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  }

  const addToFav = async () => {
    const token = sessionStorage.getItem('AccesToken')
    const { id } = jwt_decode(token)

    dispatch(addToFavorites({ item: shoeData }))

    const response = await axios.post(
      'http://localhost:5000/api/user/addToFav',
      {
        id: id,
        item: shoeData,
      }
    )
    if (response.status === 200) {
      toast.success('Item added to Favorites successfully !', {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  }

  useEffect(() => {
    getShoe()
  }, [])

  if (shoeData !== undefined) {
    return (
      <>
        <div className="shoeContainer">
          <div className="imgContainer">
            <img src={shoeData.imageURL} alt="unavailable" />
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
              <div className="button" onClick={addtoCart}>
                <h4>
                  Add to Cart <i className="fa-solid fa-cart-shopping"></i>
                </h4>
              </div>

              <div className="button" onClick={addToFav}>
                <h4>
                  Favorite <i className="fa-solid fa-heart"></i>
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
