import React, { Component } from 'react'

import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4.0,
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = newCount;

    const priceIncrease = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceIncrease;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    console.log('add', this.state.ingredients[type], this.state.totalPrice)
  };

  removeIngredientHandler = (type) => {
    // Remove 1 from ingregient count
    const oldCount = this.state.ingredients[type];
    if (oldCount === 0) {
      return;
    }
    const newCount = oldCount - 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = newCount;

    // Decrease totalPrice
    const priceDecrease = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDecrease;
    
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
    console.log('decrement', this.state)
  }

  render() {
    const disabledInfo = {
      // spread creates an entire new obj
      ...this.state.ingredients
    }
    for(let key in disabledInfo) {
      // boolean
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          totalPrice={this.state.totalPrice}
        />
      </Aux>
    )
  }
}

export default BurgerBuilder
