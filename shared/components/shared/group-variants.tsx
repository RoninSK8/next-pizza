'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';

type Variant = {
	name: string;
	value: string;
	disabled?: boolean;
};
interface Props {
	className?: string;
	items: readonly Variant[];
	defaultValue?: string;
	onClick?: (value: Variant['value']) => void;
	value?: Variant['value'];
}

export const GroupVariants: React.FC<Props> = ({
	className,
	items,
	onClick,
	value,
}) => {
	return (
		<div
			className={cn(
				'flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none',
				className
			)}
		>
			{items.map((item) => (
				<button
					key={item.value}
					className={cn(
						'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
						{
							'bg-white shadow': item.value === value,
							'text-gray-500 opacity-50 pointer-events-none': item.disabled,
						}
					)}
					onClick={() => onClick?.(item.value)}
				>
					{item.name}
				</button>
			))}
		</div>
	);
};
