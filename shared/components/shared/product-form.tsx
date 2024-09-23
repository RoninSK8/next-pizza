'use client';
import React from 'react';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';

interface Props {
	onSubmit?: VoidFunction;
	product: ProductWithRelations;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit }) => {
	const [addCartItem, loading] = useCartStore((state) => [
		state.addCartItem,
		state.loading,
	]);

	const firstItem = product.items[0];
	const isPizzaForm = Boolean(firstItem.pizzaType);

	const handleSubmit = async (
		productItemId?: number,
		ingredients?: number[]
	) => {
		try {
			const itemId = productItemId ?? firstItem.id;
			await addCartItem({ productItemId: itemId, ingredients });
			toast.success('Продукт добавлен в корзину');
			onSubmit?.();
		} catch (error) {
			toast.error('Произошла ошибка при добавлении в корзину');
			console.log(error);
		}
	};

	if (isPizzaForm) {
		return (
			<ChoosePizzaForm
				imageUrl={product.imageUrl}
				name={product.name}
				ingredients={product.ingredients}
				items={product.items}
				onSubmit={handleSubmit}
				loading={loading}
			/>
		);
	}

	return (
		<ChooseProductForm
			imageUrl={product.imageUrl}
			name={product.name}
			price={firstItem.price}
			onSubmit={handleSubmit}
			loading={loading}
		/>
	);
};
