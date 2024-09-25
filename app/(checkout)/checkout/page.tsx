'use client';
import {
	CheckoutAddressForm,
	CheckoutCart,
	CheckoutPersonalInfo,
	CheckoutSidebar,
	Container,
	Title,
} from '@/shared/components/shared';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCart } from '@/shared/hooks';

export default function CheckoutPage() {
	const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();

	const form = useForm({
		resolver: zodResolver(),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		},
	});

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

			<div className="flex gap-10">
				{/* Левая часть */}
				<div className="flex flex-col gap-10 flex-1 mb-20">
					<CheckoutCart
						items={items}
						onClickCountButton={onClickCountButton}
						removeCartItem={removeCartItem}
					/>
					<CheckoutPersonalInfo />
					<CheckoutAddressForm />
				</div>

				{/* Правая часть */}
				<div className="w-[450px]">
					<CheckoutSidebar totalAmount={totalAmount} />
				</div>
			</div>
		</Container>
	);
}
