import React from 'react';
import { cn } from '@/shared/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import { PopoverContent, PopoverTrigger, Popover } from '../ui/popover';
import { Skeleton } from '../ui';
import { SortOption } from '@/shared/hooks/use-filters';

interface Props {
	selected?: SortOption;
	loading?: boolean;
	className?: string;
	items?: { text: string; value: string }[];
	onClickSortingOption: (value: SortOption) => void;
}

export const SortPopup: React.FC<Props> = ({
	className,
	loading,
	selected,
	items,
	onClickSortingOption,
}) => {
	const [open, setOpen] = React.useState(false);

	if (loading) {
		return <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />;
	}

	const handleClickOption = (value: SortOption) => {
		onClickSortingOption(value);
		setOpen(false);
	};

	const sortOptionTitle = items?.find((item) => item.value === selected)?.text;

	return (
		<Popover open={open} onOpenChange={(status) => setOpen(status)}>
			<PopoverTrigger asChild>
				<div
					className={cn(
						'inline-flex items-center gap-1 bg-gray-50 my-5 px-2 w-[220px] h-[52px] rounded-2xl cursor-pointer hover:bg-secondary hover:text-primary',
						className
					)}
				>
					<ArrowUpDown color="hsl(var(--primary))" className="w-4 h-4" />
					<span className="mx-2">{sortOptionTitle ?? 'Сортировка'}</span>
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-[200px]">
				<ul>
					{items?.map((item) => (
						<li
							key={item.value}
							onClick={() => handleClickOption(item.value)}
							value={item.value}
							className="hover:bg-secondary hover:text-primary p-1 px-2 cursor-pointer rounded-md"
						>
							{item.text}
						</li>
					))}
				</ul>
			</PopoverContent>
		</Popover>
	);
};
