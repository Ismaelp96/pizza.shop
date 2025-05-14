import { Building, ChevronDown, LogOut } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';

export function AccountMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					className='flex items-center gap-2 select-none'>
					Pizza Shop
					<ChevronDown className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-56'>
				<DropdownMenuLabel className='flex flex-col'>
					<span>Ismael Patrick</span>
					<span className='text-muted-foreground text-xs font-normal'>
						ismael6991@live.com
					</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Building className='mr-2 h-5 w-4' />
					<span>Perfil da loja</span>
				</DropdownMenuItem>
				<DropdownMenuItem className='text-rose-500 dark:text-rose-400'>
					<LogOut className='mr-2 h-5 w-4 text-rose-500 dark:text-rose-400' />
					<span>Sair</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
