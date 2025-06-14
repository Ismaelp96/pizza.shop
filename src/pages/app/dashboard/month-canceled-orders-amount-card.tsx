import { useQuery } from '@tanstack/react-query';

import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import { MetricCardSkeleton } from './metric-card-skeleton';
export function MonthCanceledOrdersAmountCard() {
	const { data: monthCanceledOrdersAmount } = useQuery({
		queryKey: ['metrics', 'month-canceled-orders-amount'],
		queryFn: getMonthCanceledOrdersAmount,
	});
	return (
		<Card className='gap-4'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-base font-semibold'>
					Cancelamentos (mês)
				</CardTitle>
				<DollarSign className='text-muted-foreground h-4 w-4' />
			</CardHeader>
			<CardContent>
				{monthCanceledOrdersAmount ? (
					<div className='flex flex-col gap-2'>
						<span className='text-2xl font-bold tracking-tight'>
							{monthCanceledOrdersAmount.amount.toLocaleString('pt-BR')}
						</span>
						{monthCanceledOrdersAmount.diffFromLastMonth < 0 ? (
							<p className='text-muted-foreground text-xs'>
								<span className='text-rose-500 dark:text-rose-400'>
									{monthCanceledOrdersAmount.diffFromLastMonth}%
								</span>{' '}
								em relação ao mês passado
							</p>
						) : (
							<p className='text-muted-foreground text-xs'>
								<span className='text-emerald-500 dark:text-emerald-400'>
									+{monthCanceledOrdersAmount.diffFromLastMonth}%
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
