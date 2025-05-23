import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import {
	ResponsiveContainer,
	LineChart,
	XAxis,
	YAxis,
	Line,
	CartesianGrid,
} from 'recharts';
import colors from 'tailwindcss/colors';

const data = [
	{
		date: '10/12',
		revenue: 1200,
	},
	{
		date: '11/12',
		revenue: 3000,
	},
	{
		date: '12/12',
		revenue: 500,
	},
	{
		date: '13/12',
		revenue: 2500,
	},
	{
		date: '14/12',
		revenue: 800,
	},
	{
		date: '15/12',
		revenue: 900,
	},
	{
		date: '16/12',
		revenue: 2000,
	},
];

export function RevenueChart() {
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
					<DollarSign className='text-muted-foreground h-4 w-4' />
				</div>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width='100%' height={240}>
					<LineChart data={data} style={{ fontSize: 12 }}>
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
							dataKey='revenue'
							stroke={colors.violet[500]}
						/>
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
