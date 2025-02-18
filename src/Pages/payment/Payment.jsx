import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';

// todo: add key
const stripePromise = loadStripe('pk_test_51QgM02AxtBHFs8yOr49iMtRvCjf8OdfIKPmDXJ0bvOxqJ1sJ4fBHDNJTdbgQ4yJiWBxlSdFv4tknQjGDhaP8Vn6t0074ZiASro')
// console.log(stripePromise)
const Payment = () => {
    return (
        <div className='p-10'>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm/>
                </Elements>
                
            </div>
        </div>
    );
};

export default Payment;