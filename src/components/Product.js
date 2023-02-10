import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setCart } from '../redux/Cart_Favorites'
import './Product.css'
export const Product = ({ item }) => {
  const dispatch = useDispatch()
  const deleteFromCart = async () => {
    try {
      const { id } = sessionStorage.getItem('AccesToken')
      const response = await axios.post(
        'http://localhost:5000/api/user/removeFromCart',
        {
          id: id,
          item: item,
        }
      )
      console.log(response.data.data)
      dispatch(setCart({ Cart: response.data.data }))
      toast.success('item removed from cart successfully !', {
        position: 'top-center',
      })
    } catch (error) {
      toast.success('there was an error please try again later', {
        position: 'top-center',
      })
    }
  }
  return (
    <div className="product">
      <img src={item.imageURL} alt="" />
      <h4 className="title">{item.name}</h4>
      <h5 className="brand">{item.brand}</h5>
      <h4 className="prix">${item.price}</h4>
      <i class="fa-solid fa-trash-can delete" onClick={deleteFromCart}></i>
    </div>
  )
}
