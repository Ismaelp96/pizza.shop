import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation } from '@tanstack/react-query';
import { registerRestaurant } from '@/api/register-restaurant';

const signUpFormSchema = z.object({
	restaurantName: z.string(),
	managerName: z.string(),
	phone: z.string(),
	email: z.string().email(),
});

type signUpForm = z.infer<typeof signUpFormSchema>;

export function SignUp() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<signUpForm>();
	const { mutateAsync: registerRestaurantFn } = useMutation({
		mutationFn: registerRestaurant,
	});

	async function handlesignUp(data: signUpForm) {
		try {
			await registerRestaurantFn({
				restaurantName: data.restaurantName,
				managerName: data.managerName,
				email: data.email,
				phone: data.phone,
			});
			toast.success('Estabelecimento cadastrado com sucesso!.', {
				action: {
					label: 'Login',
					onClick: () => navigate(`/sign-in?email=${data.email}`),
				},
			});
		} catch (error) {
			toast.error('Erro ao cadastrar estabelecimento.');
		}
	}
	return (
		<>
			<title>Cadastro | Pizza.shop</title>
			<div className='p-8'>
				<Button asChild variant='outline' className='absolute top-8 right-8'>
					<Link to='/sign-in'>Fazer login</Link>
				</Button>
				<div className='flex w-full max-w-[350px] flex-col justify-center gap-6'>
					<div className='flex flex-col gap-2 text-center'>
						<h1 className='text-2xl font-semibold tracking-tight'>
							Criar conta gratuitamente
						</h1>
						<p className='text-muted-foreground text-sm'>
							Seja um parceiro e comece suas vendas!
						</p>
					</div>
					<form className='space-y-4' onSubmit={handleSubmit(handlesignUp)}>
						<div className='space-y-2'>
							<Label htmlFor='restaurantName'>Nome do estabelecimento</Label>
							<Input
								id='restaurantName'
								type='text'
								{...register('restaurantName')}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='managerName'>Seu nome</Label>
							<Input
								id='managerName'
								type='text'
								{...register('managerName')}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='email'>Seu e-mail</Label>
							<Input id='email' type='email' {...register('email')} />
						</div>
						<div className='space-y-2'>
							<Label htmlFor='phone'>Telefone</Label>
							<Input id='phone' type='tel' {...register('phone')} />
						</div>

						<Button type='submit' className='w-full' disabled={isSubmitting}>
							{isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
						</Button>
						<p className='text-muted-foreground px-6 text-center text-sm leading-relaxed'>
							Ao continuar, você concorda com nossos{' '}
							<a
								href='#'
								target='_blank'
								rel='noopener noreferrer'
								className='underline underline-offset-4'>
								<br />
								Termos de serviço
							</a>{' '}
							e{' '}
							<a
								href='#'
								target='_blank'
								rel='noopener noreferrer'
								className='underline underline-offset-4'>
								políticas de privacidade.
							</a>
						</p>
					</form>
				</div>
			</div>
		</>
	);
}
