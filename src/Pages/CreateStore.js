import React, { useContext, useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Token } from '../App'
import './CreateStore.css'
export default function CreateStore() {
  const { token } = useContext(Token)

  const storeName = useRef(null)
  const description = useRef(null)
  const image = useRef(null)

  if (token == null) {
    return <div>{token ? '' : <Navigate to="/" />}</div>
  }
  var { id } = jwt_decode(token)

  const Createstore = async e => {
    // console.log('clicked')
    const store = {
      storeName: storeName.current.value,
      ownerId: id,
      image: '',
      description: description.current.value,
    }
    console.log(store)
    try {
      const data = await axios.post(
        'http://localhost:5000/createStore',
        store,
        {
          headers: {
            authorization: 'Bearer ' + token,
          },
        }
      )
      console.log(data)
    } catch (error) {
      console.log(error)
    }
    try {
      const data = await axios.post(
        'http://localhost:5000/upload',
        { image: image.current.files[0] },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="container">
        <div className="CreateStoreContainer">
          <h2>Enter the infos below to create your store</h2>
          <h3>Store Name</h3>
          <input
            type="text"
            placeholder="Please type the store name ..."
            ref={storeName}
          />
          <h3>Store Description</h3>
          <textarea
            cols="30"
            rows="2"
            placeholder="Write a quick description about your store 50 characters minimum ..."
            ref={description}
          ></textarea>
          <br />
          <label for="file-upload" class="custom-file-upload">
            <i class="fa fa-cloud-upload"></i>Upload image
          </label>
          <input id="file-upload" type="file" ref={image} />
          <button onClick={Createstore}>Create Store</button>
        </div>
      </div>
    </>
  )
}
