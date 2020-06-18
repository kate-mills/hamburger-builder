import React from 'react'

import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem path="/" active>
        BurgerBuilder
      </NavigationItem>
      <NavigationItem path="/">Checkout</NavigationItem>
    </ul>
  )
}

export default NavigationItems
