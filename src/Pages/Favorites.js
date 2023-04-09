import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ProductFav } from '../components/ProductFav'
import { addToCart } from '../redux/Cart_Favorites'
import './Favorites.css'
export const Favorites = () => {
  const { Favorites } = useSelector((state) => state.Cart_Favorites)
  const dispatch = useDispatch()
  const token = sessionStorage.getItem('AccesToken')
  const AddAll = async () => {
    try {
      const token = sessionStorage.getItem('AccesToken')
      const { id } = jwtDecode(token)
      Favorites.forEach(async (item) => {
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
      })
    } catch (error) {
      toast.error('There was an error !', {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  }
  if (token == null) {
    return <div>{token ? '' : <Navigate to="/" />}</div>
  }
  return (
    <>
      <div className="container">
        <div className="products" style={{ float: 'left' }}>
          <h3 className="orders">Favorites</h3>
          <div className="items">
            {Favorites.length > 0 ? (
              Favorites.map((item) => {
                return (
                  <>
                    <ProductFav item={item} />
                  </>
                )
              })
            ) : (
              <h2>No items availlable in Favorites !</h2>
            )}
          </div>
          <h5 className="total">Subtotal</h5>

          <br></br>
          <button className="Button" onClick={AddAll}>
            Add Everything to the Cart
          </button>
        </div>
      </div>
    </>
  )
}
