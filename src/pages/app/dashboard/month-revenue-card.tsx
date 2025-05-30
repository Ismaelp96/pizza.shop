import { useQuery } from '@tanstack/react-query';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import { getMonthRevenue } from '@/api/get-month-revenue';
import { MetricCardSkeleton } from './metric-card-skeleton';
export function MonthRevenueCard() {
	const { data: monthRevenue } = useQuery({
		queryKey: ['metrics', 'month-revenue'],
		queryFn: getMonthRevenue,
	});
	return (
		<Card className='gap-4'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-base font-semibold'>
					Receita total (mês)
				</CardTitle>
				<DollarSign className='text-muted-foreground h-4 w-4' />
			</CardHeader>
			<CardContent>
				{monthRevenue ? (
					<div className='flex flex-col gap-2'>
						<span className='text-2xl font-bold tracking-tight'>
							{(monthRevenue.receipt / 100).toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							})}
						</span>
						{monthRevenue.diffFromLastMonth >= 0 ? (
							<p className='text-muted-foreground text-xs'>
								<span className='text-emerald-500 dark:text-emerald-400'>
									+{monthRevenue.diffFromLastMonth}%
								</span>{' '}
								em relação ao mês passado
							</p>
						) : (
							<p className='text-muted-foreground text-xs'>
								<span className='text-rose-500 dark:text-rose-400'>
									{monthRevenue.diffFromLastMonth}%
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
