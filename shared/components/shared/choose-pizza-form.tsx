import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Title } from './title';
import { Button } from '../ui';
import { PizzaImage } from './pizza-image';
import { GroupVariants } from './group-variants';
import {
	PizzaSize,
	pizzaSizes,
	PizzaType,
	pizzaTypes,
} from '@/shared/constants/pizza';
import { Ingredient } from '@prisma/client';
import { IngredientItem } from './ingredient-item';

interface Props {
	className?: string;
	imageUrl: string;
	name: string;
	ingredients: Ingredient[];
	items?: any[];
	onClickAdd?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<Props> = ({
	className,
	imageUrl,
	name,
	ingredients,
	items,
	onClickAdd,
}) => {
	const [size, setSize] = React.useState<PizzaSize>(30);
	const [type, setType] = React.useState<PizzaType>(1);

	const textDetails = '30 см, традиционное тесто';
	const totalPrice = 350;
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

				<div className="grid grid-cols-3 gap-3">
					{ingredients.map((ingredient) => (
						<IngredientItem
							key={ingredient.id}
							name={ingredient.name}
							imageUrl={ingredient.imageUrl}
							price={ingredient.price}
							onClick={onClickAdd}
						/>
					))}
				</div>

				<Button className="w-full h-[55px] px-10 text-base rounded-[18px] mt-10">
					Добавить в корзину за {totalPrice}₽
				</Button>
			</div>
		</div>
	);
};
