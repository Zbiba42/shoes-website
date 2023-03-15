import React from 'react'

export const OrderForm = ({ inputRefs }) => {
  return (
    <div className="FormContainer">
      <h3 className="orders">Delivery information</h3>
      <div className="form">
        <div className="formSlice1">
          <h4>Name</h4>
          <input
            type="text"
            className="input"
            placeholder="Please type your full name"
            ref={(el) => (inputRefs.current.fullName = el)}
          />
          <h4>Email</h4>
          <input
            type="email"
            className="input"
            placeholder="Please type your email"
            ref={(el) => (inputRefs.current.email = el)}
          />
          <h4>State</h4>
          <input
            type="text"
            className="input"
            placeholder="Please type your state"
            ref={(el) => (inputRefs.current.state = el)}
          />
          <h4>Adress</h4>
          <input
            type="text"
            className="input"
            placeholder="Please type your adress"
            ref={(el) => (inputRefs.current.adress = el)}
          />
        </div>
        <div className="formSlice2">
          <h4>Phone Number</h4>
          <input
            type="text"
            className="input"
            placeholder="Please type your phone number"
            ref={(el) => (inputRefs.current.phoneNumber = el)}
          />
          <h4>City</h4>
          <input
            type="text"
            className="input"
            placeholder="Please type your city"
            ref={(el) => (inputRefs.current.city = el)}
          />
          <h4>ZIP</h4>
          <input
            type="number"
            className="input"
            placeholder="Please type your zip code"
            ref={(el) => (inputRefs.current.zip = el)}
          />
        </div>
      </div>

      <div className="Date">
        <h3 className="title">Schedule Delivery</h3>

        <input
          type="date"
          id="date-input"
          name="date-input"
          ref={(el) => (inputRefs.current.date = el)}
        />
      </div>

      <div className="payement">
        <h3 className="title">Payement Method</h3>
        <input
          type="radio"
          name="Pay"
          id="Online"
          value={'Online Payement'}
          ref={(el) => (inputRefs.current.paymentMethod = el)}
        />
        <label htmlFor="Online">Online Payement</label>
        <input
          type="radio"
          name="Pay"
          id="Cash"
          value={'Cash on Delivery'}
          ref={(el) => (inputRefs.current.paymentMethod = el)}
        />
        <label htmlFor="Cash">Cash on Delivery</label>
      </div>
    </div>
  )
}
