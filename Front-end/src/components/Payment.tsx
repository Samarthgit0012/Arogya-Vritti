import { useState } from 'react';
import axios from 'axios';
import './Payment.css';
const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;


declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentProps {
  amount: number;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

const Payment = ({ amount, onSuccess, onError }: PaymentProps) => {
  const [loading, setLoading] = useState(false);

  const initializePayment = async () => {
    try {
      setLoading(true);
      
      // Create order on backend
      const { data } = await axios.post(`${BACKEND_URL}/api/payment/create-order`, {
        amount: amount
      });

      const options = {
        key: 'rzp_test_DiMiYr3VpklxK8', // Your Razorpay Key ID
        amount: data.amount,
        currency: data.currency,
        name: 'Arogya Vritti',
        description: 'Payment for services',
        order_id: data.id,
        handler: async function (response: any) {
          try {
            // Verify payment on backend
            const verification = await axios.post(`${BACKEND_URL}/api/payment/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verification.data.success) {
              onSuccess?.();
            } else {
              onError?.(new Error('Payment verification failed'));
            }
          } catch (error) {
            onError?.(error);
          }
        },
        prefill: {
          name: 'UserName',
          email: 'user@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#3399cc'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <button 
        onClick={initializePayment}
        disabled={loading}
        className="payment-button"
      >
        {loading ? 'Processing...' : `Pay ₹${amount}`}
      </button>
    </div>
  );
};

export default Payment; 