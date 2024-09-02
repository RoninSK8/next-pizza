'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFilterIngredients } from '@/app/hooks/useFilterIngredients';

interface Props {
	className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
	const { ingredients, loading, onAddId, selectedIds } = useFilterIngredients();
	const items = ingredients.map((ingredient) => ({
		value: String(ingredient.id),
		text: ingredient.name,
	}));

	return (
		<div className={cn(className)}>
			<Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
			<div className="flex flex-col gap-4">
				<FilterCheckbox name="can-cook" text="Можно собирать" value="1" />
				<FilterCheckbox name="new" text="Новинки" value="2" />
			</div>
			<div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
				<p className="font-bold mb-3">Цена от и до:</p>
				<div className="flex gap-3 mb-5">
					<Input
						type="number"
						placeholder="0"
						min={0}
						max={1000}
						defaultValue={0}
					/>
					<Input type="number" min={100} max={1000} placeholder="1000" />
				</div>
				<RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
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
				selectedIds={selectedIds}
			/>
		</div>
	);
};
