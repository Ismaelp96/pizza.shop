import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ptBR } from 'date-fns/locale';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRight, Check, Search, X } from 'lucide-react';

import type { GetOrdersResponse } from '@/api/get-orders';
import { cancelOrder } from '@/api/cancel-order';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { OrderDetails } from './order-details';
import { OrderStatus, type OrderStatusType } from '@/components/order-status';
import { deliverOrder } from '@/api/deliver-order';
import { dispatchOrder } from '@/api/dispatch-order';
import { approveOrder } from '@/api/approve-order';

interface OrderTableRowProps {
	order: {
		orderId: string;
		createdAt: string;
		status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered';
		customerName: string;
		total: number;
	};
}

export function OrderTableRow({ order }: OrderTableRowProps) {
	const queryClient = useQueryClient();
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);

	function updateOrderStatusOnCache(orderId: string, status: OrderStatusType) {
		const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
			queryKey: ['orders'],
		});
		ordersListCache.forEach(([cacheKey, cacheData]) => {
			if (!cacheData) {
				return;
			}
			queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
				...cacheData,
				orders: cacheData.orders.map((order) => {
					if (order.orderId === orderId) {
						return {
							...order,
							status,
						};
					}
					return order;
				}),
			});
		});
	}

	const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
		useMutation({
			mutationFn: cancelOrder,
			async onSuccess(_, { orderId }) {
				updateOrderStatusOnCache(orderId, 'canceled');
			},
		});

	const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
		useMutation({
			mutationFn: approveOrder,
			async onSuccess(_, { orderId }) {
				updateOrderStatusOnCache(orderId, 'processing');
			},
		});

	const { mutateAsync: dispatchOrderFn, isPending: isdispatchingOrder } =
		useMutation({
			mutationFn: dispatchOrder,
			async onSuccess(_, { orderId }) {
				updateOrderStatusOnCache(orderId, 'delivering');
			},
		});

	const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
		useMutation({
			mutationFn: deliverOrder,
			async onSuccess(_, { orderId }) {
				updateOrderStatusOnCache(orderId, 'delivered');
			},
		});

	return (
		<TableRow>
			<TableCell>
				<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
					<DialogTrigger asChild>
						<Button variant='outline' size='xs'>
							<Search className='h-3 w-3' />
							<span className='sr-only'>Detalhes do pedido</span>
						</Button>
					</DialogTrigger>
					<OrderDetails open={isDetailsOpen} orderId={order.orderId} />
				</Dialog>
			</TableCell>
			<TableCell className='font-mono text-xs font-medium'>
				{order.orderId}
			</TableCell>
			<TableCell className='text-muted-foreground'>
				{formatDistanceToNow(order.createdAt, {
					locale: ptBR,
					addSuffix: true,
				})}
			</TableCell>
			<TableCell>
				<OrderStatus status={order.status} />
			</TableCell>
			<TableCell className='font-medium'>{order.customerName}</TableCell>
			<TableCell className='font-medium'>
				{(order.total / 100).toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})}
			</TableCell>
			<TableCell>
				{order.status === 'pending' && (
					<Button
						variant='outline'
						size='xs'
						onClick={() => approveOrderFn({ orderId: order.orderId })}
						disabled={isApprovingOrder}>
						<ArrowRight className='h-3 w-3' />
						Aprovar
					</Button>
				)}
				{order.status === 'processing' && (
					<Button
						variant='outline'
						size='xs'
						onClick={() => dispatchOrderFn({ orderId: order.orderId })}
						disabled={isdispatchingOrder}>
						<ArrowRight className='h-3 w-3' />
						Em entrega
					</Button>
				)}
				{order.status === 'delivering' && (
					<Button
						variant='outline'
						size='xs'
						onClick={() => deliverOrderFn({ orderId: order.orderId })}
						disabled={isDeliveringOrder}>
						<ArrowRight className='h-3 w-3' />
						Entregue
					</Button>
				)}

				{order.status === 'delivered' && (
					<Button variant='success' size='xs' disabled>
						<Check className='h-3 w-3' />
						Finalizado
					</Button>
				)}
			</TableCell>
			<TableCell>
				<Button
					disabled={
						!['pending', 'processing'].includes(order.status) ||
						isCancelingOrder
					}
					onClick={() => cancelOrderFn({ orderId: order.orderId })}
					variant='ghost'
					size='xs'
					className={
						order.status === 'canceled'
							? 'text-destructive dark:text-destructive'
							: ''
					}>
					{order.status !== 'canceled' && <X className='h-3 w-3' />}
					{order.status === 'canceled' ? ' Cancelado' : 'Cancelar'}
				</Button>
			</TableCell>
		</TableRow>
	);
}
