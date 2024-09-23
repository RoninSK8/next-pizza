import { Cart } from '@prisma/client';
import { CartDTO } from '../services/dto/cart.dto';
import { calcCartItemTotalPrice } from './calc-cart-item-total-price';

export type CartStateItem = {
	id: number;
	quantity: number;
	name: string;
	price: number;
	imageUrl: string;
	disabled?: boolean;
	pizzaSize?: number | null;
	pizzaType?: number | null;
	ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
	items: CartStateItem[];
	totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
	const items = data.items.map((item) => ({
		id: item.id,
		quantity: item.quantity,
		name: item.productItem.product.name,
		price: calcCartItemTotalPrice(item),
		imageUrl: item.productItem.product.imageUrl,
		disabled: false,
		pizzaSize: item.productItem.size,
		pizzaType: item.productItem.pizzaType,
		ingredients: item.ingredients.map((ingredient) => ({
			name: ingredient.name,
			price: ingredient.price,
		})),
	})) as CartStateItem[];
	return {
		totalAmount: data.totalAmount,
		items,
	};
};
