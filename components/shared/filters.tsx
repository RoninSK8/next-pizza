'use client';
import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFilterIngredients } from '@/app/hooks/useFilterIngredients';
import { useSet } from 'react-use';

interface Props {
	className?: string;
}

interface PriceProps {
	priceFrom: number;
	priceTo: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
	const { ingredients, loading, onAddId, selectedIngredients } =
		useFilterIngredients();

	const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
		new Set<string>([])
	);

	const [prices, setPrices] = React.useState<PriceProps>({
		priceFrom: 0,
		priceTo: 1000,
	});
	const items = ingredients.map((ingredient) => ({
		value: String(ingredient.id),
		text: ingredient.name,
	}));

	const updatePrice = (name: keyof PriceProps, value: number) => {
		setPrices({ ...prices, [name]: value });
	};

	useEffect(() => {
		console.log({ prices, sizes, pizzaTypes, selectedIngredients });
	}, [prices, sizes, pizzaTypes, selectedIngredients]);

	return (
		<div className={cn(className)}>
			<Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

			<CheckboxFiltersGroup
				className="mb-5"
				title="Тип теста"
				name="pizzaTypes"
				onClickCkeckbox={togglePizzaTypes}
				selected={pizzaTypes}
				items={[
					{ text: 'Тонкое', value: '1' },
					{ text: 'Традиционное', value: '2' },
				]}
			/>

			<CheckboxFiltersGroup
				className="mb-5"
				title="Размеры"
				name="sizes"
				onClickCkeckbox={toggleSizes}
				selected={sizes}
				items={[
					{ text: '20 см', value: '20' },
					{ text: '30 см', value: '30' },
					{ text: '40 см', value: '40' },
				]}
			/>

			<div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
				<p className="font-bold mb-3">Цена от и до:</p>
				<div className="flex gap-3 mb-5">
					<Input
						type="number"
						placeholder="0"
						min={0}
						max={1000}
						value={String(String(prices.priceFrom))}
						onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
					/>
					<Input
						type="number"
						min={100}
						max={1000}
						placeholder="1000"
						value={String(String(prices.priceTo))}
						onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
					/>
				</div>
				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[prices.priceFrom, prices.priceTo]}
					onValueChange={([priceFrom, priceTo]) =>
						setPrices({ priceFrom, priceTo })
					}
				/>
			</div>

			<CheckboxFiltersGroup
				title="Ингредиенты"
				name="ingredients"
				className="mt-5"
				limit={6}
				defaultItems={items.slice(0, 6)}
				items={items}
				loading={loading}
				onClickCkeckbox={onAddId}
				selected={selectedIngredients}
			/>
		</div>
	);
};
