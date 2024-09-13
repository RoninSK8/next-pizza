'use client';
import React, { useEffect } from 'react';
import { cn } from '@/shared/lib/utils';
import { Title } from './title';
import { Button } from '../ui';
import { PizzaImage } from './pizza-image';
import { GroupVariants } from './group-variants';
import {
	mapPizzaType,
	PizzaSize,
	pizzaSizes,
	PizzaType,
	pizzaTypes,
} from '@/shared/constants/pizza';
import { Ingredient, ProductItem } from '@prisma/client';
import { IngredientItem } from './ingredient-item';
import { useSet } from 'react-use';
import { calcTotalPizzaPrice } from '@/shared/lib';

interface Props {
	className?: string;
	imageUrl: string;
	name: string;
	ingredients: Ingredient[];
	items: ProductItem[];
	onClickAddCart?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<Props> = ({
	className,
	imageUrl,
	name,
	ingredients,
	items,
	onClickAddCart,
}) => {
	const [size, setSize] = React.useState<PizzaSize>(30);
	const [type, setType] = React.useState<PizzaType>(1);

	const [selectedIngredients, { toggle: addIngredient }] = useSet(
		new Set<number>([])
	);

	const totalPrice = calcTotalPizzaPrice(
		items,
		size,
		type,
		ingredients,
		selectedIngredients
	);
	const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;

	const handleClickAdd = () => {
		onClickAddCart?.();
		console.log({
			size,
			type,
			ingredients: selectedIngredients,
		});
	};

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

	useEffect(() => {
		const isAvailableSize = availablePizzaSizes?.find(
			(item) => Number(item.value) === size && !item.disabled
		);
		const availableSize = availablePizzaSizes?.find((item) => !item.disabled);
		if (!isAvailableSize && availableSize) {
			setSize(Number(availableSize.value) as PizzaSize);
		}
	}, [availablePizzaSizes, size]);

	return (
		<div className={cn(className, 'flex flex-1')}>
			<PizzaImage imageUrl={imageUrl} size={size} />
			<div className="w-[490px] bg-[#f7f6f5] p-7">
				<Title text={name} size="md" className="mb-1 font-extrabold" />

				<p className="text-gray-400">{textDetails}</p>
				<div className="flex flex-col gap-3 mt-5">
					<GroupVariants
						items={availablePizzaSizes}
						value={String(size)}
						onClick={(value) => setSize(Number(value) as PizzaSize)}
					/>
					<GroupVariants
						items={pizzaTypes}
						value={String(type)}
						onClick={(value) => setType(Number(value) as PizzaType)}
					/>
				</div>

				<div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar">
					<div className="grid grid-cols-3 gap-3">
						{ingredients.map((ingredient) => (
							<IngredientItem
								key={ingredient.id}
								name={ingredient.name}
								imageUrl={ingredient.imageUrl}
								price={ingredient.price}
								active={selectedIngredients.has(ingredient.id)}
								onClick={() => addIngredient(ingredient.id)}
							/>
						))}
					</div>
				</div>

				<Button
					onClick={handleClickAdd}
					className="w-full h-[55px] px-10 text-base rounded-[18px] mt-10"
				>
					Добавить в корзину за {totalPrice}₽
				</Button>
			</div>
		</div>
	);
};
