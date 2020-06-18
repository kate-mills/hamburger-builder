import React from 'react'
import Aux from '../../../hoc/Aux'

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((k, i) => {
    return (
      <li key={i}>
        <span style={{ textTransform: 'capitalize' }}>{k}</span>:{' '}
        {props.ingredients[k]}
      </li>
    )
  })

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicous burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout?</p>
    </Aux>
  )
}

export default OrderSummary
