import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';

import './global.css';

import { router } from './routes';
import { ThemeProvider } from './components/theme/theme-provider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryCleint } from './lib/react-query';

export function App() {
	return (
		<ThemeProvider defaultTheme='dark' storageKey='pizzashop-theme'>
			<Toaster richColors />
			<QueryClientProvider client={queryCleint}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</ThemeProvider>
	);
}
