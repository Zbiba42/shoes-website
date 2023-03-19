import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setCart, setFavorites } from '../redux/Cart_Favorites'
import './Product.css'
export const ProductFav = ({ item }) => {
  const dispatch = useDispatch()
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
    <Link
      to={`/shoes/${item.name}`}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      <div className="product">
        <img src={item.imageURL} alt="" />
        <h4 className="title">{item.name}</h4>
        <h5 className="brand">{item.brand}</h5>
        <h4 className="prix">${item.price}</h4>
        <i class="fa-solid fa-trash-can delete" onClick={deleteFromFav}></i>
      </div>
    </Link>
  )
}
