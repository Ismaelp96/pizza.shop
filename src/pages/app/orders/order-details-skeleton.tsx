import { Skeleton } from '@/components/ui/skeleton';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

export function OrderDetailsSkeleton() {
	return (
		<div className='space-y-6'>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell className='text-muted-foreground'>Status</TableCell>
						<TableCell className='flex justify-end'>
							<Skeleton className='h-4 w-20' />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className='text-muted-foreground'>Cliente</TableCell>
						<TableCell className='flex justify-end'>
							<Skeleton className='h-4 w-40' />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className='text-muted-foreground'>Telefone</TableCell>
						<TableCell className='flex justify-end'>
							<Skeleton className='h-4 w-35' />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className='text-muted-foreground'>E-mail</TableCell>
						<TableCell className='flex justify-end'>
							<Skeleton className='h-4 w-50' />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className='text-muted-foreground'>
							Realizado há
						</TableCell>
						<TableCell className='flex justify-end'>
							<Skeleton className='h-4 w-37' />
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Produto</TableHead>
						<TableHead className='text-right'>Qtd.</TableHead>
						<TableHead className='text-right'>Preço</TableHead>
						<TableHead className='text-right'>Subtotal</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from({ length: 2 }).map((_, i) => {
						return (
							<TableRow key={i}>
								<TableCell>
									<Skeleton className='h-4 w-35' />
								</TableCell>
								<TableCell>
									<Skeleton className='ml-auto h-4 w-4' />
								</TableCell>
								<TableCell>
									<Skeleton className='ml-auto h-4 w-12' />
								</TableCell>
								<TableCell>
									<Skeleton className='ml-auto h-4 w-12' />
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={3}>Total do pedido</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-20' />
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
}
