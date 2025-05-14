import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';

import './global.css';

import { router } from './routes';
import { ThemeProvider } from './components/theme/theme-provider';

export function App() {
	return (
		<ThemeProvider defaultTheme='dark' storageKey='pizzashop-theme'>
			<Toaster richColors />
			<RouterProvider router={router} />
		</ThemeProvider>
	);
}
