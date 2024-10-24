import React from 'react';
import { cn } from '@/shared/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import { PopoverContent, PopoverTrigger, Popover } from '../ui/popover';

interface Props {
	className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<div
					className={cn(
						'inline-flex items-center gap-1 bg-gray-50 my-5 px-2 h-[52px] rounded-2xl cursor-pointer hover:bg-secondary hover:text-primary',
						className
					)}
				>
					<ArrowUpDown color="hsl(var(--primary))" className="w-4 h-4" />
					<b className="">Сначала недорогие</b>
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-[200px]">
				<ul>
					<li className="hover:bg-secondary hover:text-primary p-1 px-2 cursor-pointer rounded-md">
						Сначала недорогие
					</li>
					<li className="hover:bg-secondary hover:text-primary p-1 px-2 cursor-pointer rounded-md">
						Сначала дорогие
					</li>
				</ul>
			</PopoverContent>
		</Popover>
	);
};
