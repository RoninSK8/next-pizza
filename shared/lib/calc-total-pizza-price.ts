import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType } from '../constants/pizza';

/**
 * Функция для подсчета общей стоимости пиццы
 *
 * @param items - список вариаций
 * @param size - размер выбранной пиццы
 * @param type - тип теста выбранной пиццы
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиентов
 */
export const calcTotalPizzaPrice = (
	items: ProductItem[],
	size: PizzaSize,
	type: PizzaType,
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
) => {
	const pizzaPrice =
		items.find((item) => item.pizzaType === type && item.size === size)
			?.price || 0;

	const totalIngredientsPrice = ingredients
		.filter((ingredient) => selectedIngredients.has(ingredient.id))
		.reduce((acc, ingredient) => {
			return acc + ingredient.price;
		}, 0);

	const totalPrice = pizzaPrice + totalIngredientsPrice;
	return totalPrice;
};
