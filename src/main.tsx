import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { Provider } from 'react-redux';
import { store, persistor } from './store/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './utils/stripe/stripe.utils.js';

import App from './App.jsx';
import './index.scss';

const rootElement = document.getElementById('root');

if (!rootElement) {
	throw new Error("Root element not found. Make sure there's a div with id='root' in your index.html");
}

createRoot(rootElement).render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<BrowserRouter>
					<Elements stripe={stripePromise}>
						<App />
					</Elements>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</StrictMode>
);
