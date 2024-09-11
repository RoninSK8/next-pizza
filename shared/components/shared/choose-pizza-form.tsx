import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Title } from './title';
import { Button } from '../ui';
import { PizzaImage } from './pizza-image';

interface Props {
	className?: string;
	imageUrl: string;
	name: string;
	ingredients: any[];
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
	const textDetails = '30 см, традиционное тесто';
	const totalPrice = 350;
	const size = 30;
	return (
		<div className={cn(className, 'flex flex-1')}>
			<PizzaImage imageUrl={imageUrl} size={size} />
			<div className="w-[490px] bg-[#f7f6f5] p-7">
				<Title text={name} size="md" className="mb-1 font-extrabold" />
				<p className="text-gray-400">{textDetails}</p>
				<Button className="w-full h-[55px] px-10 text-base rounded-[18px] mt-10">
					Добавить в корзину за {totalPrice}₽
				</Button>
			</div>
		</div>
	);
};
