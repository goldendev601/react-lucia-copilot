import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import {
    itinerariesSelector, 
    advisorRequestsCompleteIntentPayment
} from "redux/features/itineraries/itinerariesSlice";

export default function CheckoutForm({stepChange, id}) {

   
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {advisorRequestId, advisorRequestType} = useSelector(itinerariesSelector);

    useEffect(() => {

        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    if (advisorRequestId) {
                        dispatch(advisorRequestsCompleteIntentPayment({advisorId: advisorRequestId }))
                    }
                    setMessage("Payment succeeded!");
                    stepChange('final');
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: process.env.REACT_APP_DOMAIN_URL + '/itinerary-details/' + id.id + '/',
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occured.");
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <Typography component="h6" style={{fontSize: '15px', fontWeight: '600', fontFamily: 'Raleway', color: '#333'}}>Price for this task</Typography>
            <Typography component="h1" style={{fontSize: '25px', fontWeight: '600', fontFamily: 'Raleway', color: '#BA886E'}}>${advisorRequestType.amount}</Typography>
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}