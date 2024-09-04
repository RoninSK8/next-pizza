'use client';
import { useCategoryStore } from '@/app/store/category';
import { cn } from '@/lib/utils';
import { Category } from '@prisma/client';
import React from 'react';

interface Props {
	items: Category[];
	className?: string;
}

export const Categories: React.FC<Props> = ({ className, items }) => {
	const categoryActiveId = useCategoryStore((state) => state.activeId);
	return (
		<div
			className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}
		>
			{items.map(({ name, id }, index) => (
				<a
					key={index}
					className={cn(
						'flex item-center font-bold h-11 rounded-2xl px-5',
						id === categoryActiveId &&
							'bg-white shadow-md shadow-gray-200 text-primary'
					)}
					href={`/#${name}`}
				>
					<button>{name}</button>
				</a>
			))}
		</div>
	);
};
