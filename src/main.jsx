import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { UserProvider } from './providers/user.provider.jsx';
import { CategoriesProvider } from './providers/categories.provider.jsx';
import { CartProvider } from './providers/cart.provider.jsx';

import App from './App.jsx';

import './index.scss';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<UserProvider>
				<CategoriesProvider>
					<CartProvider>
						<App />
					</CartProvider>
				</CategoriesProvider>
			</UserProvider>
		</BrowserRouter>
	</StrictMode>
);
