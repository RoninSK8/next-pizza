'use client';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formRegisterSchema, TFormRegisterValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, Title } from '../../..';
import { Button } from '@/shared/components/ui';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { registerUser } from '@/app/actions';

interface Props {
	onClose?: () => void;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
	const form = useForm<TFormRegisterValues>({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			email: '',
			fullName: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (data: TFormRegisterValues) => {
		try {
			await registerUser({
				email: data.email,
				fullName: data.fullName,
				password: data.password,
			});

			toast.success('Регистрация успешна. Подтвердите свою почту');
			onClose?.();
		} catch (error) {
			console.log('Error [REGISTER]', error);
			toast.error('Не удалось зарегистрироваться');
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
						<Title text="Регистрация" size="md" className="font-bold" />
					</div>
				</div>
				<FormInput name="email" label="E-Mail" required />
				<FormInput name="fullName" label="Полное имя" required />

				<FormInput type="password" name="password" label="Пароль" required />
				<FormInput
					type="password"
					name="confirmPassword"
					label="Повторите пароль"
					required
				/>
				<Button
					loading={form.formState.isSubmitting}
					className="h-12 text-base"
					type="submit"
				>
					Зарегистрироваться
				</Button>
			</form>
		</FormProvider>
	);
};
