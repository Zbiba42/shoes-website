import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import './UpdateShoe.css'
export const UpdateShoe = () => {
  const { Id } = useParams()
  const [shoeData, setShoeData] = useState({})
  const name = useRef()
  const brand = useRef()
  const gender = useRef()
  const category = useRef()
  const price = useRef()
  const [isInInventory, setIsInInventory] = useState(false)
  const itemsLeft = useRef()
  const imageURL = useRef()
  const dispatch = useDispatch()

  const getShoe = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/Shoes/ShoeUp/${Id}`
    )
    console.log(data.data)
    setShoeData(data.data)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    let updatedShoe = {
      name: name.current.value,
      brand: brand.current.value,
      gender: gender.current.value,
      category: category.current.value,
      price: price.current.value,
      is_in_inventory: isInInventory,
      items_left: itemsLeft.current.value,
      imageURL: imageURL.current.files[0],
    }
    const ProductResponse = await axios.post(
      'http://localhost:5000/api/seller/updateProduct',
      { updatedItem: updatedShoe, itemId: shoeData._id }
    )
    const ImgResponse = await axios.post(
      'http://localhost:5000/api/seller/uploadProduct',
      { image: updatedShoe.imageURL, id: shoeData._id },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    console.log(updatedShoe)
  }

  useEffect(() => {
    getShoe()
  }, [])
  return (
    <>
      <div className="container">
        <div className="shoeContainer">
          <div className="imgContainer" style={{ position: 'relative' }}>
            <img src={shoeData.imageURL} alt="unavailable" />
            <label
              for="imageURL"
              class="inputadd"
              style={{
                position: 'absolute',
                top: '21.5%',
                right: '27.5%',
                cursor: 'pointer',
              }}
            >
              <i class="fa-solid fa-pen"></i>
            </label>
            <input
              className="inputadd"
              type="file"
              id="imageURL"
              name="imageURL"
              ref={imageURL}
              required
            />
          </div>

          <form className="update-form" onSubmit={handleFormSubmit}>
            <h2>Update Product</h2>
            <label htmlFor="name">Name</label>
            <input
              defaultValue={shoeData.name}
              ref={name}
              type="text"
              id="name"
              name="name"
              required
            />
            <label htmlFor="brand">Brand</label>
            <input
              defaultValue={shoeData.brand}
              ref={brand}
              type="text"
              id="brand"
              name="brand"
              required
            />
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" ref={gender} required>
              <option value="MEN">Men</option>
              <option value="WOMEN">Women</option>
            </select>
            <label htmlFor="category">Category</label>
            <input
              defaultValue={shoeData.category}
              ref={category}
              type="text"
              id="category"
              name="category"
              required
            />
            <label htmlFor="price">Price</label>
            <input
              defaultValue={shoeData.price}
              ref={price}
              type="number"
              id="price"
              name="price"
              min="0"
              step="0.01"
              required
            />
            <label htmlFor="is_in_inventory">Is in Inventory</label>
            <input
              type="checkbox"
              id="is_in_inventory"
              name="is_in_inventory"
              checked={isInInventory}
              onChange={(e) => setIsInInventory(e.target.checked)}
            />
            <label htmlFor="items_left">Items Left</label>
            <input
              defaultValue={shoeData.items_left}
              ref={itemsLeft}
              type="number"
              id="items_left"
              name="items_left"
              min="0"
            />

            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </>
  )
}
