import React from 'react'
import Aux from '../../hoc/Aux'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import classes from './Layout.module.css'

const layout = (props) => {
  return (
    <Aux>
      <Toolbar />
      <SideDrawer />
      Backdrop
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  )
}

export default layout
