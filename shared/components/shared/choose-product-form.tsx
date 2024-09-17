import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Title } from './title';
import { Button } from '../ui';

interface Props {
	className?: string;
	imageUrl: string;
	name: string;
	onSubmit?: VoidFunction;
	price: number;
}

export const ChooseProductForm: React.FC<Props> = ({
	className,
	imageUrl,
	name,
	onSubmit,
	price,
}) => {
	return (
		<div className={cn(className, 'flex flex-1')}>
			<div className="flex items-center justify-center flex-1 relative w-full">
				<img
					src={imageUrl}
					alt={name}
					className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
				/>
			</div>

			<div className="w-[490px] bg-[#f7f6f5] p-7">
				<Title text={name} size="md" className="mb-1 font-extrabold" />

				<Button
					onClick={onSubmit}
					className="w-full h-[55px] px-10 text-base rounded-[18px] mt-10"
				>
					Добавить в корзину за {price}₽
				</Button>
			</div>
		</div>
	);
};
