import React, { useMemo, useState } from "react"
import axios from "axios"
import { Button } from "react-bootstrap"
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useResponsiveFontSize from "./useResponsiveFontSize"
import { useDispatch } from "react-redux"
import { payOrder } from "../actions/orderActions"
import Loader from "./Loader"

const useOptions = () => {
    const fontSize = useResponsiveFontSize();
    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize,
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Source Code Pro, monospace",
                    "::placeholder": {
                        color: "#aab7c4"
                    }
                },
                invalid: {
                    color: "#9e2146"
                }
            }
        }),
        [fontSize]
    );

    return options;
};

const StripePayment = ({ email_address, orderId, amount }) => {
    const dispatch = useDispatch()
    const options = useOptions();
    const stripe = useStripe();
    const elements = useElements();
    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState("")
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)

    const handleChange = e => {
        console.log(e)
        setDisabled(e.empty)
        if (e.empty === false) {
            setDisabled(!e.complete)
        }

        setError(e.error ? e.error.message : "")
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const total = Number((amount * 100).toFixed(2))

        const { data: { client_secret: clientSecret } } =
            await axios.get(`/api/config/stripe?total=${total}`)

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            }
        }).then(({ paymentIntent }) => {
            console.log("succeeded")
            console.log(email_address)
            setSucceeded(true)
            setError(null)
            setProcessing(false)

            const paymentResult = {
                id: paymentIntent.id,
                status: paymentIntent.status,
                update_time: paymentIntent.created,
                payer: { email_address: email_address }
            }

            console.log(paymentResult)
            dispatch(payOrder(orderId, paymentResult))

        }).catch(error => {
            setError(error)
            console.log(error)
        })


    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={options}
                onChange={handleChange}
                onBlur={() => {
                    console.log("CardElement [blur]");
                }}
                onFocus={() => {
                    console.log("CardElement [focus]");
                }}


            />
            <Button
                variant={disabled ? "secondary" : processing ? "secondary" : "success"}
                type="submit"
                size="sm"
                disabled={processing || disabled || succeeded}>
                {processing ? <Loader /> : "Pay"}

            </Button>
        </form>
    );
};

export default StripePayment