import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_51GugI2B9lUXfYWT3Q7hy31UAZWpg3VzojeQXg1EQkQgJRUGEQXzFaUYWzser69QMREVq0oPWUl6MUqPHUV9f6MDn00eFNILbyT'

    const onToken = token => {
        console.log(token)
        alert('Payment Successful')
    }

    return (
        <StripeCheckout
            label = 'Pay Now'
            name = 'Morning Flower Trading LLC.'
            billingAddress
            shippingAddress
            image = '../../assets/4.3 crown.svg.svg'
            description = {`Your total is $${price}`}
            amount = {priceForStripe}
            panelLabel = 'Pay Now'
            token = {onToken}
            stripeKey = {publishableKey}
        />
    )
}

export default StripeCheckoutButton