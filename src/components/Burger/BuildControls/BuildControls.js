import React from 'react'
import BuildControl from './BuildControl/BuildControl'

import classes from './BuildControls.module.css'

const controls = [
    { label: 'Salad',  type: 'salad' },
    { label: 'Bacon',  type: 'bacon' },
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat',   type: 'meat'  },
];


const BuildControls = (props) => {
  return(
    <div className={classes.BuildControls}>
      {
        controls.map((ctrl, i) => {
          return <BuildControl key={i} label={ctrl.label} type={ctrl.type} />
        })
      }
    </div>
  )
}

export default BuildControls
