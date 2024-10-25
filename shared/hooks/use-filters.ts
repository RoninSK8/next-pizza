import { useSearchParams } from 'next/navigation';

import { useMemo, useState } from 'react';
import { useSet } from 'react-use';

interface PriceProps {
	priceFrom?: number;
	priceTo?: number;
}

export type SortOption = string | undefined;

interface QueryFilters extends PriceProps {
	pizzaTypes: string;
	sizes: string;
	ingredients: string;
	sort: string;
}

export interface Filters {
	sizes: Set<string>;
	pizzaTypes: Set<string>;
	selectedIngredients: Set<string>;
	prices: PriceProps;
	sort: SortOption;
}

interface ReturnProps extends Filters {
	setPrices: (name: keyof PriceProps, value: number) => void;
	setPizzaTypes: (value: string) => void;
	setSizes: (value: string) => void;
	setSelectedIngredients: (value: string) => void;
	setSort: (value: SortOption) => void;

	resetSizes: () => void;
	resetPizzaTypes: () => void;
	resetIngredients: () => void;
	resetPrices: () => void;
	resetSort: () => void;
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

	const [sort, setSort] = useState<SortOption>(
		searchParams.get('sort') || undefined
	);

	const resetSort = () => {
		setSort(undefined);
	};

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
			sort,
			setPrices: updatePrice,
			setSelectedIngredients: toggleIngredients,
			setSizes: toggleSizes,
			setPizzaTypes: togglePizzaTypes,
			setSort,
			resetSort,
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
			sort,
			toggleIngredients,
			toggleSizes,
			togglePizzaTypes,
			setSort,
			resetPizzaTypes,
			resetSizes,
			resetIngredients,
		]
	);
};
