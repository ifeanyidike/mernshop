import React from 'react'
import { usePaystackPayment } from 'react-paystack';
import { useDispatch } from "react-redux"
import { payOrder } from "../actions/orderActions"
import { Button, Image } from "react-bootstrap"


const PayStackPayment = ({ amount, email, orderId }) => {
    const dispatch = useDispatch()
    const config = {
        reference: (new Date()).getTime(),
        email: email,
        amount: parseInt(amount) * 100,
        publicKey: 'pk_live_f2baa2bd6699a9dedee2d7ca465a4062501649e4',
    };

    const PayStackHooks = () => {
        const initializePayment = usePaystackPayment(config);
        return (
            <div>
                <Button
                    type='button'

                    className='btn btn-block btn-success'
                    onClick={() => {
                        initializePayment(onSuccess, onClose)
                    }}>
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Paystack_Logo.png"
                        alt="Pay with Paystack" width="40%"></Image>

                </Button>

            </div>
        );
    };


    const onSuccess = (reference) => {
        const paymentResult = {
            id: reference.trxref,
            status: reference.status,
            update_time: String((new Date()).getTime()),
            payer: { email_address: email }
        }

        dispatch(payOrder(orderId, paymentResult))
    }

    const onClose = (ref) => console.log(ref)

    return (
        <div>
            <PayStackHooks />
        </div>
    )
}

export default PayStackPayment
