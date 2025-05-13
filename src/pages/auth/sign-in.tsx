import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const signInFormSchema = z.object({
	email: z.string().email(),
});

type SignInForm = z.infer<typeof signInFormSchema>;

export function SignIn() {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<SignInForm>();
	async function handleSignIn(data: SignInForm) {
		await new Promise((resolve) => setTimeout(resolve, 2000));
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
						<Button
							type='submit'
							className='w-full cursor-pointer'
							disabled={isSubmitting}>
							{isSubmitting ? 'Entrando...' : 'Acessar painel'}
						</Button>
					</form>
				</div>
			</div>
		</>
	);
}
