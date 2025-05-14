import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

export function OrderDetails() {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Pedido: 12123928yh</DialogTitle>
				<DialogDescription>Detalhes do pedido</DialogDescription>
			</DialogHeader>
			<div className='space-y-6'>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell className='text-muted-foreground'>Status</TableCell>
							<TableCell className='flex justify-end'>
								<div className='flex items-center gap-2'>
									<span className='h-2 w-2 rounded-full bg-slate-400' />
									<span className='text-muted-foreground font-medium'>
										Pendente
									</span>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className='text-muted-foreground'>Cliente</TableCell>
							<TableCell className='flex justify-end'>
								<span>Ismael Patrick</span>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className='text-muted-foreground'>Telefone</TableCell>
							<TableCell className='flex justify-end'>
								<span>31995820947</span>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className='text-muted-foreground'>E-mail</TableCell>
							<TableCell className='flex justify-end'>
								<span>ismael6991@live.com</span>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className='text-muted-foreground'>
								Realizado há
							</TableCell>
							<TableCell className='flex justify-end'>
								<span>3 minutos</span>
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
						<TableRow>
							<TableCell>Pizza pepperoni Família</TableCell>
							<TableCell className='text-right'>2</TableCell>
							<TableCell className='text-right'>R$ 49,90</TableCell>
							<TableCell className='text-right'>R$ 99,80</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Pizza mussarela</TableCell>
							<TableCell className='text-right'>2</TableCell>
							<TableCell className='text-right'>R$ 39,90</TableCell>
							<TableCell className='text-right'>R$ 79,80</TableCell>
						</TableRow>
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={3}>Total do pedido</TableCell>
							<TableCell className='text-right font-medium'>
								R$ 179,60
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		</DialogContent>
	);
}
