```javascript
import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '../supabaseClient';

export default function StripeCheckout() {
  const handlePayment = async () => {
    const { data, error } = await supabase.from('products').select('*').limit(1);
    if (error) throw error;

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    const { error: stripeError } = await stripe.redirectToCheckout({
      lineItems: [{ price: data[0].price_id, quantity: 1 }],
      mode: 'payment',
      successUrl: `${window.location.origin}?success=true`,
      cancelUrl: `${window.location.origin}?canceled=true`,
    });

    if (stripeError) {
      alert(stripeError.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded-md"
        onClick={handlePayment}
      >
        Checkout
      </button>
    </div>
  );
}

export async function getServerSideProps() {
  const { data, error } = await supabase.from('products').select('*').limit(1);
  if (error) return { notFound: true };
  return { props: { product: data[0] } };
}
```