import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    const [error, setError] = useState();
    const [trasectionId, setTransectionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    const totalPrice = 100
    // console.log(totalPrice)
    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    // console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        const card = elements.getElement(CardElement)
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            // console.log('[error]', error);
            setError(error.message);
        }
        else {
            // console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymus",
                    name: user?.displayName || "anonymus"
                }
            }
        });

        if (confirmError) {
            
        }
        else {
            // console.log('payment Intent', paymentIntent)
            if (paymentIntent.status === "succeeded") {
                setTransectionId(paymentIntent.id);

                
                const res = await axiosSecure.patch('/subscribe')
                if(res.data.modifiedCount>0){
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Thank's for being Premium .",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    
                }
                navigate('/')
                
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            >
            </CardElement>
            <button className="btn bg-orange-600" type="submit" disabled={!stripe || !clientSecret}>
                Pay $ {totalPrice}
            </button>
            <p className="text-red-600">{error}</p>
            {
                trasectionId && <p className="text-green-600">Transection id: {trasectionId}</p>
            }

        </form>
    );
};

export default CheckoutForm;