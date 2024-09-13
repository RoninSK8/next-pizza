import { ProductItem } from '@prisma/client';
import { pizzaSizes, PizzaType } from '../constants/pizza';
import { Variant } from '../components/shared/group-variants';

export const getAvailablePizzaSizes = (
	items: ProductItem[],
	type: PizzaType
): Variant[] => {
	const filteredPizzasByType = items.filter((item) => item.pizzaType === type);
	const availablePizzaSizes = pizzaSizes.map((item) => {
		return {
			name: item.name,
			value: item.value,
			disabled: !filteredPizzasByType.some(
				(pizza) => pizza.size === Number(item.value)
			),
		};
	});

	return availablePizzaSizes;
};
