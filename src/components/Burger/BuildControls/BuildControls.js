import React from 'react'
import BuildControl from './BuildControl/BuildControl'

import classes from './BuildControls.module.css'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
]

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>${props.totalPrice.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            type={ctrl.type}
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)}
            disabled={props.disabledInfo[ctrl.type]}
          />
        )
      })}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.purchasing}
      >
        ORDER NOW
      </button>
    </div>
  )
}

export default BuildControls
