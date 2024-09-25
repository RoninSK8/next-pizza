import React from 'react';
import { CheckoutItem, WhiteBlock } from '..';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { getCartItemDetails } from '@/shared/lib';
import { CartStateItem } from '@/shared/lib/get-cart-details';

interface Props {
	items: CartStateItem[];

	onClickCountButton: (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => void;
	removeCartItem: (id: number) => void;

	className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
	className,
	items,
	onClickCountButton,
	removeCartItem,
}) => {
	return (
		<WhiteBlock title="1. Корзина" className={className}>
			<div className="flex flex-col gap-5">
				{items.map((item) => (
					<CheckoutItem
						key={item.id}
						id={item.id}
						disabled={item.disabled}
						details={
							item.pizzaSize && item.pizzaType
								? getCartItemDetails(
										item.ingredients,
										item.pizzaType as PizzaType,
										item.pizzaSize as PizzaSize
								  )
								: ''
						}
						imageUrl={item.imageUrl}
						name={item.name}
						price={item.price}
						quantity={item.quantity}
						onClickCountButton={(type) =>
							onClickCountButton(item.id, item.quantity, type)
						}
						onClickRemoveButton={() => removeCartItem(item.id)}
					/>
				))}
			</div>
		</WhiteBlock>
	);
};
