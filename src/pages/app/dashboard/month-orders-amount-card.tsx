import { useQuery } from '@tanstack/react-query';

import { getMounthOrdersAmout } from '@/api/get-month-orders-amount';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils } from 'lucide-react';
import { MetricCardSkeleton } from './metric-card-skeleton';

export function MonthOrdersAmountCard() {
	const { data: monthOrdersAmount } = useQuery({
		queryKey: ['metrics', 'month-orders-amount'],
		queryFn: getMounthOrdersAmout,
	});
	return (
		<Card className='gap-4'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-base font-semibold'>Pedidos (mês)</CardTitle>
				<Utensils className='text-muted-foreground h-4 w-4' />
			</CardHeader>
			<CardContent>
				{monthOrdersAmount ? (
					<div className='flex flex-col gap-2'>
						<span className='text-2xl font-bold tracking-tight'>
							{monthOrdersAmount.amount.toLocaleString('pt-BR')}
						</span>
						{monthOrdersAmount.diffFromLastMonth >= 0 ? (
							<p className='text-muted-foreground text-xs'>
								<span className='text-emerald-500 dark:text-emerald-400'>
									+{monthOrdersAmount.diffFromLastMonth}%
								</span>{' '}
								em relação ao mês passado
							</p>
						) : (
							<p className='text-muted-foreground text-xs'>
								<span className='text-rose-500 dark:text-rose-400'>
									{monthOrdersAmount.diffFromLastMonth}%
								</span>{' '}
								em relação ao mês passado
							</p>
						)}
					</div>
				) : (
					<MetricCardSkeleton />
				)}
			</CardContent>
		</Card>
	);
}
