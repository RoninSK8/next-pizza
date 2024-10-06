'use client';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formLoginSchema, TFormLoginValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, Title } from '../../..';
import { Button } from '@/shared/components/ui';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

interface Props {
	onClose?: () => void;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
	const form = useForm<TFormLoginValues>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: TFormLoginValues) => {
		try {
			const resp = await signIn('credentials', {
				...data,
				redirect: false,
			});
			if (!resp?.ok) {
				throw Error();
			}
			toast.success('Вы успешно вошли в аккаунт');
			onClose?.();
		} catch (error) {
			console.log('Error [LOGIN]', error);
			toast.error('Не удалось войти в аккаунт');
		}
	};
	return (
		<FormProvider {...form}>
			<form
				action=""
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-5"
			>
				<div className="flex justify-between items-center">
					<div className="mr-2">
						<Title text="Вход в аккаунт" size="md" className="font-bold" />
						<p className="text-gray-400">
							Введите свою почту, чтобы войти в свой аккаунт
						</p>
					</div>
					<img
						src="/assets/images/phone-icon.png"
						alt="phone-icon"
						width={60}
						height={60}
					/>
				</div>
				<FormInput name="email" label="E-Mail" required />
				<FormInput name="password" label="Пароль" type="password" required />
				<Button
					loading={form.formState.isSubmitting}
					className="h-12 text-base"
					type="submit"
				>
					Войти
				</Button>
			</form>
		</FormProvider>
	);
};
