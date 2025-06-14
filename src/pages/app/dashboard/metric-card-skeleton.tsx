import { Skeleton } from '@/components/ui/skeleton';

export function MetricCardSkeleton() {
	return (
		<div className='flex flex-col gap-2'>
			<Skeleton className='mt-1 h-7 w-36' />
			<Skeleton className='h-4 w-52' />
		</div>
	);
}
