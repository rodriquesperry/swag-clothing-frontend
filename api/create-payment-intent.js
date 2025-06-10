import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	// Set CORS headers
	const allowedOrigins = [
		'http://localhost:5173',
		'https://swag-clothing.vercel.app',
	];
	const origin = req.headers.origin;

	if (allowedOrigins.includes(origin)) {
		res.setHeader('Access-Control-Allow-Origin', origin);
		res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	}
	// Handle preflight OPTIONS request
	if (req.method === 'OPTIONS') {
		return res.status(200).end();
	}

	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	try {
		const { amount, user } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

		let customer;
		if (user?.email) {
			// Try to find existing customer
			const existingCustomers = await stripe.customers.list({
				email: user.email,
				limit: 1,
			});
			if (existingCustomers.data.length > 0) {
				customer = existingCustomers.data[0];
			} else {
				// Or create one
				customer = await stripe.customers.create({
					email: user.email,
					name: user.name,
				});
			}
		}
    
		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency: 'usd',
			payment_method_types: ['card'],
			customer: customer?.id,
			metadata: {
				name: user?.name || 'Guest',
				email: user?.email || '',
			},
		});

		return res.status(200).json({ paymentIntent: paymentIntent });
	} catch (error) {
    console.error('Stripe Error:', error);
		return res.status(500).json({ error: error.message });
	}
}
