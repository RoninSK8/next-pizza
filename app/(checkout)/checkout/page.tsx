'use client';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
	CheckoutAddressForm,
	CheckoutCart,
	CheckoutPersonalInfo,
	CheckoutSidebar,
	Container,
	Title,
} from '@/shared/components/shared';
import { checkoutFormSchema, CheckoutFormValues } from '@/shared/constants';
import { useCart } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';
import { createOrder } from '@/app/actions';

export default function CheckoutPage() {
	const { totalAmount, items, updateItemQuantity, removeCartItem, loading } =
		useCart();

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		},
	});

	const onSubmit = (data: CheckoutFormValues) => {
		console.log(data);
		createOrder(data);
	};

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};
	return (
		<Container>
			<Title
				text="Оформление заказа"
				className="font-extrabold mb-8 text-[36px]"
			/>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex gap-10">
						{/* Левая часть */}
						<div className="flex flex-col gap-10 flex-1 mb-20">
							<CheckoutCart
								items={items}
								onClickCountButton={onClickCountButton}
								removeCartItem={removeCartItem}
								loading={loading}
							/>
							<CheckoutPersonalInfo
								className={loading ? 'opacity-40 pointer-events-none' : ''}
							/>
							<CheckoutAddressForm
								className={loading ? 'opacity-40 pointer-events-none' : ''}
							/>
						</div>

						{/* Правая часть */}
						<div className="w-[450px]">
							<CheckoutSidebar totalAmount={totalAmount} loading={loading} />
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	);
}
