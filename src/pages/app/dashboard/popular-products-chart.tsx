import { getPopularProducts } from '@/api/get-popular-products';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Loader2 } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Text } from 'recharts';
import colors from 'tailwindcss/colors';

const COLORS = [
	colors.sky[500],
	colors.amber[500],
	colors.violet[500],
	colors.emerald[500],
	colors.rose[500],
];

export function PopularProductsChart() {
	const { data: popularProducts } = useQuery({
		queryKey: ['metrics', 'popular-products'],
		queryFn: getPopularProducts,
	});

	return (
		<Card className='col-span-3 grid'>
			<CardHeader className='flex flex-row items-center justify-between pb-8'>
				<div className='flex w-full items-center justify-between'>
					<CardTitle className='text-base font-medium'>
						Produtos Populares
					</CardTitle>
					<BarChart className='text-muted-foreground h-4 w-4'>
						Receita diária no período
					</BarChart>
				</div>
			</CardHeader>
			<CardContent>
				{popularProducts ? (
					<ResponsiveContainer width='100%' height={240}>
						<PieChart data={popularProducts} style={{ fontSize: 12 }}>
							<Pie
								data={popularProducts}
								type='linear'
								dataKey='amount'
								nameKey='product'
								cx='50%'
								cy='50%'
								outerRadius={86}
								innerRadius={64}
								strokeWidth={8}
								labelLine={false}
								label={({
									cx,
									cy,
									midAngle,
									innerRadius,
									outerRadius,
									value,
									index,
								}) => {
									const RADIAN = Math.PI / 180;
									const radius = 12 + innerRadius + (outerRadius - innerRadius);
									const x = cx + radius * Math.cos(-midAngle * RADIAN);
									const y = cy + radius * Math.sin(-midAngle * RADIAN);
									return (
										<Text
											x={x}
											y={y}
											className='fill-muted-foreground text-xs'
											textAnchor={x > cx ? 'start' : 'end'}
											dominantBaseline='central'>
											{`${
												popularProducts[index].product.length > 12
													? popularProducts[index].product
															.substring(0, 12)
															.concat('...')
													: popularProducts[index].product
											}
										(${value})`}
										</Text>
									);
								}}>
								{popularProducts.map((_, i) => {
									return (
										<Cell
											key={`cell-${i}`}
											fill={COLORS[i]}
											className='stroke-card transition-opacity hover:opacity-85'
										/>
									);
								})}
							</Pie>
						</PieChart>
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
