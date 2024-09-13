import { useEffect, useState } from 'react';
import { PizzaSize, PizzaType } from '../constants/pizza';
import { Variant } from '../components/shared/group-variants';
import { useSet } from 'react-use';
import { getAvailablePizzaSizes } from '../lib/get-available-pizza-sizes';
import { ProductItem } from '@prisma/client';
interface ReturnProps {
	size: PizzaSize;
	type: PizzaType;
	setSize: (value: PizzaSize) => void;
	setType: (value: PizzaType) => void;
	selectedIngredients: Set<number>;
	addIngredient: (id: number) => void;
	availablePizzaSizes: Variant[];
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
	const [size, setSize] = useState<PizzaSize>(30);
	const [type, setType] = useState<PizzaType>(1);

	const [selectedIngredients, { toggle: addIngredient }] = useSet(
		new Set<number>([])
	);
	const availablePizzaSizes = getAvailablePizzaSizes(items, type);

	useEffect(() => {
		const isAvailableSize = availablePizzaSizes?.find(
			(item) => Number(item.value) === size && !item.disabled
		);
		const availableSize = availablePizzaSizes?.find((item) => !item.disabled);
		if (!isAvailableSize && availableSize) {
			setSize(Number(availableSize.value) as PizzaSize);
		}
	}, [availablePizzaSizes, size]);

	return {
		size,
		type,
		setSize,
		setType,
		selectedIngredients,
		addIngredient,
		availablePizzaSizes,
	};
};
