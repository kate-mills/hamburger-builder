import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import withErrorHandler from '../../hoc/withErrorHandler'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'

const INGREDIENT_PRICES = { salad: 0.5, bacon: 0.7, cheese: 0.4, meat: 1.3 }
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4.0,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  }
  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then((response) => {
        this.setState({ ingredients: response.data })
      })
      .catch((error) => this.setState({ error: true }))
  }
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients) // creates an array of keys
      .map((k) => {
        return ingredients[k] // transforms into an array of values
      })
      .reduce((sum, v) => {
        return sum + v // sums up array of values
      }, 0)
    this.setState({ purchasable: sum > 0 })
  }
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const newCount = oldCount + 1
    const updatedIngredients = { ...this.state.ingredients }
    updatedIngredients[type] = newCount
    const priceIncrease = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceIncrease
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
    this.updatePurchaseState(updatedIngredients)
  }
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    if (oldCount === 0) {
      return
    }
    const newCount = oldCount - 1
    const updatedIngredients = { ...this.state.ingredients }
    updatedIngredients[type] = newCount
    const priceDecrease = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceDecrease
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
    this.updatePurchaseState(updatedIngredients)
  }
  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }
  purchaseContinueHandler = () => {
    this.setState({ loading: true })
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice, // check price on server
      customer: {
        name: 'Kate Mills',
        address: {
          street: '2472 Balfour ct.',
          city: 'Napa',
          zipCode: '94558',
          state: 'CA',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    }
    axios
      .post('/orders.json', order)
      .then((response) => this.setState({ loading: false, purchasing: false }))
      .catch((error) => this.setState({ loading: false, purchasing: false }))
  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null
    let burger = this.state.error ? (
      <p>Ingredients can not be loaded.</p>
    ) : (
      <Spinner />
    )
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            purchasable={this.state.purchasable}
            totalPrice={this.state.totalPrice}
            purchasing={this.purchaseHandler}
          />
        </Aux>
      )

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseContinued={this.purchaseContinueHandler}
          purchaseCanceled={this.purchaseCancelHandler}
          price={this.state.totalPrice}
        />
      )
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal
          modalClosed={this.purchaseCancelHandler}
          show={this.state.purchasing}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}
export default withErrorHandler(BurgerBuilder, axios)
