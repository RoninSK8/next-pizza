import React from 'react';
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
import { ProductWithRelations } from '@/@types/prisma';

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

	const pizzaPrice =
		items.find((item) => item.pizzaType === type && item.size === size)
			?.price || 0;

	const totalIngredientsPrice = ingredients
		.filter((ingredient) => selectedIngredients.has(ingredient.id))
		.reduce((acc, ingredient) => {
			return acc + ingredient.price;
		}, 0);

	const totalPrice = pizzaPrice + totalIngredientsPrice;

	const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;

	const handleClickAdd = () => {
		onClickAddCart?.();
		console.log({
			size,
			type,
			ingredients: selectedIngredients,
		});
	};

	console.log(ingredients);
	return (
		<div className={cn(className, 'flex flex-1')}>
			<PizzaImage imageUrl={imageUrl} size={size} />
			<div className="w-[490px] bg-[#f7f6f5] p-7">
				<Title text={name} size="md" className="mb-1 font-extrabold" />

				<p className="text-gray-400">{textDetails}</p>
				<div className="flex flex-col gap-3 mt-5">
					<GroupVariants
						items={pizzaSizes}
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
