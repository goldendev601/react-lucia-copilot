import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
    itinerariesSelector,
    advisorRequestsPayUsingIntent,
} from "redux/features/itineraries/itinerariesSlice";
import CheckoutForm from "./CheckoutForm";
import "./App.css";


const AdvisorPay = ({ stepChange, id }) => {

    const dispatch = useDispatch();

    // const [step, setStep] = useState("advisorPay");

    const { advisorRequestId, clientSecret, stripeKey } = useSelector(itinerariesSelector);
    let stripePromise;

    if (stripeKey) {
        stripePromise = loadStripe(stripeKey)
    }

    useEffect(() => {
        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );
        if (advisorRequestId && !clientSecret) {
            dispatch(advisorRequestsPayUsingIntent({ advisorId: advisorRequestId }))
        }
    }, [advisorRequestId]);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };
    

    return (
        <div className="App">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm stepChange={stepChange} id={id} />
                </Elements>
            )}
        </div>
    );
}

export default AdvisorPay