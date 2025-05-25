import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { Provider } from 'react-redux';
import { store } from './store/store.js';

import { CategoriesProvider } from './providers/categories.provider.jsx';
import { CartProvider } from './providers/cart.provider.jsx';

import App from './App.jsx';

import './index.scss';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				{/* <CategoriesProvider> */}
					{/* <CartProvider> */}
						<App />
					{/* </CartProvider> */}
				{/* </CategoriesProvider> */}
			</BrowserRouter>
		</Provider>
	</StrictMode>
);
