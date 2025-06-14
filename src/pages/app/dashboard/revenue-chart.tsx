import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { DateRange } from 'react-day-picker';
import { subDays } from 'date-fns';
import colors from 'tailwindcss/colors';
import {
	ResponsiveContainer,
	LineChart,
	XAxis,
	YAxis,
	Line,
	CartesianGrid,
} from 'recharts';

import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { DateRangerPicker } from '@/components/date-ranger-picker';
import { Loader2 } from 'lucide-react';

export function RevenueChart() {
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: subDays(new Date(), 7),
		to: new Date(),
	});
	const { data: dailyRevenueInPeriod } = useQuery({
		queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
		queryFn: () =>
			getDailyRevenueInPeriod({
				from: dateRange?.from,
				to: dateRange?.to,
			}),
	});

	const chartData = useMemo(() => {
		return dailyRevenueInPeriod?.map((chartItem) => {
			return {
				date: chartItem.date,
				receipt: chartItem.receipt / 100,
			};
		});
	}, [dailyRevenueInPeriod]);

	return (
		<Card className='col-span-6'>
			<CardHeader className='flex flex-row items-center justify-between pb-8'>
				<div className='flex w-full items-center justify-between'>
					<div className='space-y-1'>
						<CardTitle className='text-base font-medium'>
							Receita no período
						</CardTitle>
						<CardDescription>Receita diária no período</CardDescription>
					</div>
				</div>
				<div className='flex items-center gap-3'>
					<Label>Período</Label>
					<DateRangerPicker date={dateRange} onDateChange={setDateRange} />
				</div>
			</CardHeader>
			<CardContent>
				{chartData ? (
					<ResponsiveContainer width='100%' height={240}>
						<LineChart data={chartData} style={{ fontSize: 12 }}>
							<XAxis
								stroke='#888'
								dataKey='date'
								tickLine={false}
								axisLine={false}
								dy={16}
							/>
							<YAxis
								stroke='#888'
								axisLine={false}
								tickLine={false}
								width={80}
								tickFormatter={(value: number) =>
									value.toLocaleString('pt-BR', {
										style: 'currency',
										currency: 'BRL',
									})
								}
							/>
							<CartesianGrid vertical={false} className='stroke-muted' />
							<Line
								type='linear'
								strokeWidth={2}
								dataKey='receipt'
								stroke={colors.violet[500]}
							/>
						</LineChart>
					</ResponsiveContainer>
				) : (
					<div className='flex h-[240px] w-full items-center justify-center'>
						<Loader2 className='text-muted-foreground h-8 w-8 animate-spin' />
					</div>
				)}
			</CardContent>
		</Card>
	);
}
