'use client';
import { cn } from '@/shared/lib/utils';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import {
	useIngredients,
	useFilters,
	useQueryFilters,
	useMinAndMaxPrices,
} from '@/shared/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { SortPopup } from './sort-popup';
import { SortOption } from '@/shared/hooks/use-filters';

interface Props {
	className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
	const router = useRouter();
	const { ingredients, loading } = useIngredients();
	const filters = useFilters();
	const { minMaxprices, minMaxPricesLoading } = useMinAndMaxPrices();

	useQueryFilters(filters);

	const items = ingredients.map((ingredient) => ({
		value: String(ingredient.id),
		text: ingredient.name,
	}));

	const updatePrices = (prices: number[]) => {
		filters.setPrices('priceFrom', prices[0]);
		filters.setPrices('priceTo', prices[1]);
	};

	const updateSortingOption = (value: SortOption) => {
		filters.setSort(value);
	};

	const clearFilters = () => {
		filters.resetAllFilters();

		router.push(`/`, { scroll: false });
	};

	return (
		<div className={cn(className)}>
			<SortPopup
				onClickSortingOption={updateSortingOption}
				selected={filters.sort}
				items={[
					{ text: 'Сначала недорогие', value: 'priceAsc' },
					{ text: 'Сначала дорогие', value: 'priceDesc' },
				]}
			/>
			<CheckboxFiltersGroup
				className="mb-5"
				title="Тип теста"
				name="pizzaTypes"
				onClickCkeckbox={filters.setPizzaTypes}
				selected={filters.pizzaTypes}
				items={[
					{ text: 'Тонкое', value: '1' },
					{ text: 'Традиционное', value: '2' },
				]}
			/>

			<CheckboxFiltersGroup
				className="mb-5"
				title="Размеры"
				name="sizes"
				onClickCkeckbox={filters.setSizes}
				selected={filters.sizes}
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
						placeholder={String(minMaxprices.minPrice)}
						min={minMaxprices.minPrice}
						max={minMaxprices.maxPrice}
						value={String(filters.prices.priceFrom) || '0'}
						onChange={(e) =>
							filters.setPrices('priceFrom', Number(e.target.value))
						}
					/>
					<Input
						type="number"
						min={minMaxprices.minPrice}
						max={minMaxprices.maxPrice}
						placeholder={String(minMaxprices.maxPrice)}
						value={String(filters.prices.priceTo) || '1000'}
						onChange={(e) =>
							filters.setPrices('priceTo', Number(e.target.value))
						}
					/>
				</div>
				<RangeSlider
					min={minMaxprices.minPrice}
					max={minMaxprices.maxPrice}
					step={10}
					value={[
						filters.prices.priceFrom || 0,
						filters.prices.priceTo || 1000,
					]}
					onValueChange={updatePrices}
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
				onClickCkeckbox={filters.setSelectedIngredients}
				selected={filters.selectedIngredients}
			/>
			{useSearchParams().size > 0 && (
				<button onClick={clearFilters} className="text-primary mt-3">
					Очистить фильтры
				</button>
			)}
		</div>
	);
};
