import { api } from '@/lib/axios';

interface getManagedRestaurantResponse {
	id: string;
	name: string;
	description: string | null;
	managerId: string | null;
	createdAt: Date | null;
	updatedAt: Date | null;
}

export async function getManagedRestaurant() {
	const response = await api.get<getManagedRestaurantResponse>(
		'/managed-restaurant',
	);
	return response.data;
}
