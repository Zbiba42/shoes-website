import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addToCart, setFavorites } from '../redux/Cart_Favorites'
import './Product.css'
export const ProductFav = ({ item }) => {
  const dispatch = useDispatch()
  const addtoCart = async () => {
    const token = sessionStorage.getItem('AccesToken')
    const { id } = jwtDecode(token)

    dispatch(addToCart({ item: item }))

    const response = await axios.post(
      'http://localhost:5000/api/user/addToCart',
      {
        id: id,
        item: item,
      }
    )
    if (response.status === 200) {
      toast.success('Item added to cart successfully !', {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  }
  const deleteFromFav = async () => {
    try {
      const { id } = sessionStorage.getItem('AccesToken')
      const response = await axios.post(
        'http://localhost:5000/api/user/removeFromFav',
        {
          id: id,
          item: item,
        }
      )
      console.log(response.data.data)
      dispatch(setFavorites({ Favorites: response.data.data }))
      toast.success('item removed from favorites successfully !', {
        position: 'top-center',
      })
    } catch (error) {
      toast.success('there was an error please try again later', {
        position: 'top-center',
      })
    }
  }
  return (
    <div className="product" style={{ width: '800px', float: 'left' }}>
      <Link
        to={`/shoes/${item.name}`}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <img src={item.imageURL} alt="" style={{ width: '15%' }} />
        <h4 className="title">{item.name}</h4>
        <h5 className="brand">{item.brand}</h5>
        <h4 className="prix">${item.price}</h4>
      </Link>
      <i class="fa-solid fa-cart-plus Add" onClick={addtoCart}></i>
      <i class="fa-solid fa-trash-can delete" onClick={deleteFromFav}></i>
    </div>
  )
}
