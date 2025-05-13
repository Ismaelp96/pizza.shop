import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';

import './global.css';

import { router } from './routes';

export function App() {
	return (
		<>
			<Toaster richColors />
			<RouterProvider router={router} />
		</>
	);
}
