import { Building, ChevronDown, LogOut } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { getProfile } from '@/api/get-profile';
import { getManagedRestaurant } from '@/api/get-managed-restaurant';

import { Button } from '../ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Skeleton } from '../ui/skeleton';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { StoreProfileDialog } from '../store-profile-dialog';
import { SignOut } from '@/api/sign-out';
import { useNavigate } from 'react-router';

export function AccountMenu() {
	const navigate = useNavigate();
	const { data: profile, isLoading: isLoadingProfile } = useQuery({
		queryKey: ['profile'],
		queryFn: getProfile,
		staleTime: Infinity,
	});

	const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
		useQuery({
			queryKey: ['managed-restaurant'],
			queryFn: getManagedRestaurant,
			staleTime: Infinity,
		});

	const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
		mutationFn: SignOut,
		onSuccess: () => {
			navigate('/sign-in', { replace: true });
		},
	});
	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='outline'
						className='flex items-center gap-2 select-none'>
						{isLoadingManagedRestaurant ? (
							<Skeleton className='h-4 w-30' />
						) : (
							managedRestaurant?.name
						)}
						<ChevronDown className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end' className='w-56'>
					<DropdownMenuLabel className='flex flex-col'>
						{isLoadingProfile ? (
							<div className='space-y-1.5'>
								<Skeleton className='h-3 w-24' />
								<Skeleton className='h-4 w-32' />
							</div>
						) : (
							<>
								<span>{profile?.name}</span>
								<span className='text-muted-foreground text-xs font-normal'>
									{profile?.email}
								</span>
							</>
						)}
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DialogTrigger asChild>
						<DropdownMenuItem className='cursor-pointer'>
							<Building className='mr-1' />
							<span>Perfil da loja</span>
						</DropdownMenuItem>
					</DialogTrigger>
					<DropdownMenuItem
						asChild
						className='cursor-pointer text-rose-500 dark:text-rose-400'
						disabled={isSigningOut}>
						<button className='w-full' onClick={() => signOutFn()}>
							<LogOut className='mr-1 text-rose-500 dark:text-rose-400' />
							<span>{isSigningOut ? 'Saindo...' : 'Sair'}</span>
						</button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<StoreProfileDialog />
		</Dialog>
	);
}
