import { api } from '@/lib/axios';

export interface GetDayOrdersAmoutResponse {
	amount: number;
	diffFromYesterday: number;
}

export async function getDayOrdersAmout() {
	const response = await api.get<GetDayOrdersAmoutResponse>(
		'/metrics/day-orders-amount',
	);
	return response.data;
}
