'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Dialog } from '@/components/ui';
import { Product } from '@prisma/client';
import { DialogContent } from '@/components/ui/dialog';
import { Title } from '../title';
import { useRouter } from 'next/navigation';

interface Props {
	product: Product;
	className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
	const router = useRouter();
	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					'p-o w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className
				)}
			>
				<Title text={product.name} />
			</DialogContent>
		</Dialog>
	);
};
