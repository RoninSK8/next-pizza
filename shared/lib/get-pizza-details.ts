import { Ingredient, ProductItem } from '@prisma/client';
import { calcTotalPizzaPrice } from './calc-total-pizza-price';
import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza';

export const getPizzaDetails = (
	items: ProductItem[],
	selectedIngredients: Set<number>,
	size: PizzaSize,
	type: PizzaType,
	ingredients: Ingredient[]
) => {
	const totalPrice = calcTotalPizzaPrice(
		items,
		size,
		type,
		ingredients,
		selectedIngredients
	);
	const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;
	return { totalPrice, textDetails };
};
