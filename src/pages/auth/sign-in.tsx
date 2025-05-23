import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useSearchParams } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { signIn } from '@/api/sign-in';

const signInFormSchema = z.object({
	email: z.string().email(),
});

type SignInForm = z.infer<typeof signInFormSchema>;

export function SignIn() {
	const [searchParams] = useSearchParams();
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<SignInForm>({
		defaultValues: {
			email: searchParams.get('email') ?? '',
		},
	});

	const { mutateAsync: authenticate } = useMutation({
		mutationFn: signIn,
	});
	async function handleSignIn(data: SignInForm) {
		await authenticate({ email: data.email });
		toast.success('Enviamos um link de autenticação para seu e-mail.', {
			action: {
				label: 'Reenviar',
				onClick: () => handleSignIn(data),
			},
		});
	}
	return (
		<>
			<title>Login | Pizza.shop</title>
			<div className='p-8'>
				<Button asChild variant='outline' className='absolute top-8 right-8'>
					<Link to='/sign-up'>Cadastre seu estabelecimento</Link>
				</Button>
				<div className='flex w-full max-w-[350px] flex-col justify-center gap-6'>
					<div className='flex flex-col gap-2 text-center'>
						<h1 className='text-2xl font-semibold tracking-tight'>
							Acessar Painel
						</h1>
						<p className='text-muted-foreground text-sm'>
							Acompanhe suas vendas pelo painel do parceiro!
						</p>
					</div>
					<form className='space-y-4' onSubmit={handleSubmit(handleSignIn)}>
						<div className='space-y-2'>
							<Label htmlFor='email'>Seu e-mail</Label>
							<Input
								id='email'
								type='email'
								placeholder=''
								{...register('email')}
							/>
						</div>
						<Button type='submit' className='w-full' disabled={isSubmitting}>
							{isSubmitting ? 'Entrando...' : 'Acessar painel'}
						</Button>
					</form>
				</div>
			</div>
		</>
	);
}
