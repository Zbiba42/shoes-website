import React, { useRef, useState } from 'react'
import './addProduct.css'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
export const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    gender: '',
    category: '',
    price: '',
    is_in_inventory: false,
    items_left: '',
    imageURL: '',
  })
  const image = useRef()
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const fieldValue = type === 'checkbox' ? checked : value
    setFormData({ ...formData, [name]: fieldValue })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle form submission here
    const { _id } = jwtDecode(sessionStorage.getItem('AccesToken')).Store
    console.log({ ...formData, StoreId: _id })
    const ProductResponse = await axios.post(
      'http://localhost:5000/api/seller/addProduct',
      { item: { ...formData, StoreId: _id } }
    )
    console.log(ProductResponse)
    console.log(image.current.files[0])
    const ImgResponse = await axios.post(
      'http://localhost:5000/api/seller/uploadProduct',
      { image: image.current.files[0] },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    // Reset form data
    setFormData({
      name: '',
      brand: '',
      gender: '',
      category: '',
      price: '',
      is_in_inventory: false,
      items_left: '',
      imageURL: '',
    })
  }
  return (
    <>
      <div className="container">
        <form
          className="form-container"
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >
          <h2 className="form-title">Add Product</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              className="inputadd"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="brand">Brand</label>
            <input
              className="inputadd"
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <input
              className="inputadd"
              type="text"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              className="inputadd"
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              className="inputadd"
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="is_in_inventory">Is in Inventory</label>
            <input
              className="inputadd"
              type="checkbox"
              id="is_in_inventory"
              name="is_in_inventory"
              checked={formData.is_in_inventory}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="items_left">Items Left</label>
            <input
              className="inputadd"
              type="number"
              id="items_left"
              name="items_left"
              value={formData.items_left}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label
              for="imageURL"
              class="inputadd"
              style={{ width: '400px', textAlign: 'center' }}
            >
              <i class="fa fa-cloud-upload"></i>Upload image
            </label>
            <input
              className="inputadd"
              type="file"
              id="imageURL"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
              required
              ref={image}
            />
          </div>
          <input type="submit" value="Submit" className="form-submit" />
        </form>
      </div>
    </>
  )
}
