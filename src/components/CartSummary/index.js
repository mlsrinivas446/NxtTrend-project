import {useState} from 'react'
import Popup from 'reactjs-popup'
import {IoMdCheckmarkCircle} from 'react-icons/io'
import CartContext from '../../context/CartContext'
import './index.css'

const paymentMethods = [
  {optionId: 'phonePeId', optionText: 'Phone Pe'},
  {optionId: 'googlePayId', optionText: 'Google Pay'},
  {optionId: 'walletId', optionText: 'Wallet'},
  {optionId: 'cardsId', optionText: 'Credit / Debit / ATM card'},
  {optionId: 'netBankingId', optionText: 'Net Banking'},
  {optionId: 'emiId', optionText: 'EMI (Easy Installment)'},
  {optionId: 'cashonDeliveryId', optionText: 'Cash on Delivery'},
]

const CartSummary = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Phone Pe')

  const handlePaymentChange = event => {
    setSelectedPaymentMethod(event.target.value)
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        const totalPrice = cartList.reduce(
          (accumulator, currentItem) =>
            accumulator + currentItem.price * currentItem.quantity,
          0,
        )

        return (
          <div className="summary-cart-container">
            <h1 className="total-amount">
              Order Total:
              <span className="span-amount">Rs {totalPrice}/-</span>
            </h1>
            <p className="no-of-items">{cartList.length} items in cart</p>
            <Popup
              trigger={
                <button className="checkout-button" type="button">
                  Checkout
                </button>
              }
              modal
            >
              <div className="payment-method-container">
                <h1 className="payment-method-heading">PAYMENT METHODS</h1>
                <div className="payment-container">
                  <ul className="payment-option-container">
                    {paymentMethods.map(each => (
                      <li key={each.optionId} className="payment-option">
                        <input
                          type="radio"
                          value={each.optionText}
                          id={each.optionId}
                          checked={selectedPaymentMethod === each.optionText}
                          onChange={handlePaymentChange}
                        />
                        <label
                          htmlFor={each.optionId}
                          className="payment-label"
                        >
                          {each.optionText}
                        </label>
                      </li>
                    ))}
                  </ul>
                  <div className="payment-details-container">
                    <h1 className="price-detail-heading">Price Details</h1>
                    <hr className="horizontal-line" />
                    <div className="price-option">
                      <p className="price-text">
                        Price ({cartList.length}
                        {cartList.length === 1 ? 'item' : 'items'})
                      </p>
                      <p className="price-text">Rs {totalPrice}/-</p>
                    </div>
                    <div className="price-option">
                      <p className="price-text">Delivery Charges</p>
                      <p className="free-text">FREE</p>
                    </div>
                    <hr className="horizontal-line" />
                    <div className="price-option">
                      <p className="total-price">Amount Payable</p>
                      <p className="total-price">Rs {totalPrice}/-</p>
                    </div>
                    <Popup
                      modal
                      trigger={
                        <button
                          className="button confirm-order"
                          type="button"
                          disabled={
                            selectedPaymentMethod === 'Cash on Delivery'
                          }
                        >
                          Confirm Order
                        </button>
                      }
                    >
                      <div className="success-container">
                        <h1 className="congrats-message">Congratulations!</h1>
                        <IoMdCheckmarkCircle className="success-icon" />
                        <p className="success-message">
                          Your order has been placed successfully
                        </p>
                        <button type="button" className="shop-now-button">
                          Continue Shopping
                        </button>
                      </div>
                    </Popup>
                  </div>
                </div>
                <p className="terms-text">
                  Policies: Return Policy | Terms of Use | Security | Privacy |
                  @2024 NxtTrend.ccbp.tech
                </p>
              </div>
            </Popup>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
