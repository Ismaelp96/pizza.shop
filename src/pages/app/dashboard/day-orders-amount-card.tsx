import { getDayOrdersAmout } from '@/api/get-day-orders-amout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Utensils } from 'lucide-react';
export function DayOrdersAmountCard() {
	const { data: dayOrdersAmount } = useQuery({
		queryKey: ['metrics', 'day-orders-amount'],
		queryFn: getDayOrdersAmout,
	});
	return (
		<Card className='gap-4'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-base font-semibold'>Pedidos (dia)</CardTitle>
				<Utensils className='text-muted-foreground h-4 w-4' />
			</CardHeader>
			<CardContent>
				{dayOrdersAmount && (
					<div className='flex flex-col gap-2'>
						<span className='text-2xl font-bold tracking-tight'>
							{dayOrdersAmount.amount.toLocaleString('pt-BR')}
						</span>
						{dayOrdersAmount.diffFromYesterday >= 0 ? (
							<p className='text-muted-foreground text-xs'>
								<span className='text-emerald-500 dark:text-emerald-400'>
									+{dayOrdersAmount.diffFromYesterday}%
								</span>{' '}
								em relação ao dia anterior
							</p>
						) : (
							<p className='text-muted-foreground text-xs'>
								<span className='text-rose-500 dark:text-rose-400'>
									{dayOrdersAmount.diffFromYesterday}%
								</span>{' '}
								em relação ao dia anterior
							</p>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
