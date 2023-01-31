import React, { useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

import './CreateStore.css'
export default function CreateStore() {

  const storeName = useRef(null)
  const description = useRef(null)
  const image = useRef(null)

  const token = sessionStorage.getItem('AccesToken')
  if (token == null) {
    return <div>{token ? '' : <Navigate to="/" />}</div>
  }
  const { id } = jwt_decode(token) 
  
  console.log(jwt_decode(token))
  const Createstore = async (e) => {
    
    // console.log('clicked')
    const token = sessionStorage.getItem('AccesToken')
    var { Email } = jwt_decode(token)
    const store = {
      storeName: storeName.current.value,
      ownerId: id,
      image: '',
      description: description.current.value,
      Email : Email
    }

    const StoreResponse = await axios.post(
      'http://localhost:5000/createStore',
      store,
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    console.log(StoreResponse)

    const ImgResponse = await axios.post(
      'http://localhost:5000/upload',
      { image: image.current.files[0] ,Email : Email},
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    console.log(ImgResponse)
    if (StoreResponse.status == 200 && ImgResponse.status == 200) {
      sessionStorage.setItem('AccesToken',ImgResponse.data.data.accesToken)
      
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
