import { z } from 'zod';

export const passWordSchema = z
	.string()
	.min(6, { message: 'Минимальная длина пароля 6 символов' });

export const updatePassWordSchema = passWordSchema.or(z.literal(''));

export const formLoginSchema = z.object({
	email: z.string().email({ message: 'Введите корректный e-mail' }),
	password: passWordSchema,
});

export const formRegisterSchema = formLoginSchema
	.merge(
		z.object({
			fullName: z.string().min(2, { message: 'Введите имя и фамилию' }),

			confirmPassword: passWordSchema,
		})
	)
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	});

export const updateProfileSchema = z
	.object({
		email: z.string().email({ message: 'Введите корректный e-mail' }),
		fullName: z.string().min(2, { message: 'Введите имя и фамилию' }),
		password: updatePassWordSchema,
		confirmPassword: updatePassWordSchema,
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	});

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
export type TUpdateProfileValues = z.infer<typeof updateProfileSchema>;
