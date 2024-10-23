import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Container } from './container';
import { Categories } from './categories';

import { Category } from '@prisma/client';

interface Props {
	categories: Category[];
	className?: string;
}

export const TopBar: React.FC<Props> = ({ className, categories }) => {
	return (
		<div
			className={cn(
				'sticky top-0 bg-white py-3 shadow-lg shadow-black/5 z-10',
				className
			)}
		>
			<Container className="flex items-center justify-between">
				<Categories items={categories} />
			</Container>
		</div>
	);
};
