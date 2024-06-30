import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const totalPrice = cartList.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.price * currentItem.quantity
      }, 0)

      return (
        <div className="summary-cart-container">
          <h1 className="total-amount">
            Order Total: <span className="span-amount">Rs {totalPrice}/-</span>
          </h1>
          <p className="no-of-items">{cartList.length} items in cart</p>
          <button className="checkout-button">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
