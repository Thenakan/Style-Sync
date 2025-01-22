import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-12-18.acacia',
});

// Handle POST request
export async function POST(req: Request) {
  try {
    const { paymentMethodId, plan, price, returnUrl } = await req.json();

    // Validate required fields
    if (!paymentMethodId || typeof paymentMethodId !== 'string') {
      throw new Error('Invalid or missing paymentMethodId.');
    }
    if (!plan || typeof plan !== 'string') {
      throw new Error('Invalid or missing plan.');
    }
    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      throw new Error('Invalid or missing price.');
    }

    // Convert price to the smallest currency unit (e.g., cents)
    const amount = Math.round(parseFloat(price) * 100);

    let paymentIntent;

    if (returnUrl) {
      // Option 1: Handle redirects and require a return URL
      paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'lkr',
        payment_method: paymentMethodId,
        confirm: true,
        return_url: returnUrl,
      });
    } else {
      // Option 2: Disable redirects
      paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'lkr',
        payment_method: paymentMethodId,
        confirm: true,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never',
        },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        paymentIntentId: paymentIntent.id,
        status: paymentIntent.status,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Stripe payment error:', error);

    let errorMessage = 'Internal server error';
    if (error instanceof Stripe.errors.StripeError) {
      errorMessage = error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
