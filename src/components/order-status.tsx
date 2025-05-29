export type OrderStatusType =
	| 'pending'
	| 'canceled'
	| 'processing'
	| 'delivering'
	| 'delivered';

interface OrderStatusProps {
	status: OrderStatusType;
}

const OrderStatusMap: Record<OrderStatusType, string> = {
	pending: 'Pendente',
	canceled: 'Cancelado',
	delivered: 'Entregue',
	processing: 'Em preparo',
	delivering: 'Em entrega',
};
export function OrderStatus({ status }: OrderStatusProps) {
	return (
		<div className='flex items-center gap-2'>
			{status === 'pending' && (
				<span className='h-2 w-2 rounded-full bg-slate-500' />
			)}
			{status === 'canceled' && (
				<span className='h-2 w-2 rounded-full bg-rose-500 dark:bg-rose-600' />
			)}
			{status === 'delivered' && (
				<span className='h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-600' />
			)}
			{['processing', 'delivering'].includes(status) && (
				<span className='h-2 w-2 rounded-full bg-amber-500 dark:bg-amber-600' />
			)}
			<span className='text-muted-foreground font-medium'>
				{OrderStatusMap[status]}
			</span>
		</div>
	);
}
