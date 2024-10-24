import { useSearchParams } from 'next/navigation';

import { useMemo, useState } from 'react';
import { useSet } from 'react-use';

interface PriceProps {
	priceFrom?: number;
	priceTo?: number;
}

interface QueryFilters extends PriceProps {
	pizzaTypes: string;
	sizes: string;
	ingredients: string;
}

export interface Filters {
	sizes: Set<string>;
	pizzaTypes: Set<string>;
	selectedIngredients: Set<string>;
	prices: PriceProps;
}

interface ReturnProps extends Filters {
	setPrices: (name: keyof PriceProps, value: number) => void;
	setPizzaTypes: (value: string) => void;
	setSizes: (value: string) => void;
	setSelectedIngredients: (value: string) => void;

	resetSizes: () => void;
	resetPizzaTypes: () => void;
	resetIngredients: () => void;
	resetPrices: () => void;
}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams() as unknown as Map<
		keyof QueryFilters,
		string
	>;

	const [
		selectedIngredients,
		{ toggle: toggleIngredients, reset: resetIngredients },
	] = useSet(
		new Set<string>(searchParams.get('ingredients')?.split(',') || [])
	);

	const [sizes, { toggle: toggleSizes, reset: resetSizes }] = useSet(
		new Set<string>(searchParams.get('sizes')?.split(',') || [])
	);
	const [pizzaTypes, { toggle: togglePizzaTypes, reset: resetPizzaTypes }] =
		useSet(new Set<string>(searchParams.get('pizzaTypes')?.split(',') || []));

	const [prices, setPrices] = useState<PriceProps>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
	});

	const updatePrice = (name: keyof PriceProps, value: number) => {
		setPrices((prev) => ({ ...prev, [name]: value }));
	};

	const resetPrices = () => {
		setPrices({
			priceFrom: undefined,
			priceTo: undefined,
		});
	};

	return useMemo(
		() => ({
			sizes,
			pizzaTypes,
			selectedIngredients,
			prices,
			setPrices: updatePrice,
			setSelectedIngredients: toggleIngredients,
			setSizes: toggleSizes,
			setPizzaTypes: togglePizzaTypes,
			resetPizzaTypes,
			resetSizes,
			resetIngredients,
			resetPrices,
		}),
		[
			sizes,
			pizzaTypes,
			selectedIngredients,
			prices,
			toggleIngredients,
			toggleSizes,
			togglePizzaTypes,
			resetPizzaTypes,
			resetSizes,
			resetIngredients,
		]
	);
};
