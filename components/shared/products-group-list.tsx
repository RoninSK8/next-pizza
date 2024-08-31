'use client';
import React from 'react';
import { useIntersection } from 'react-use';
import { Title } from './title';
import { cn } from '@/lib/utils';
import { ProductCard } from './product-card';
import { useCategoryStore } from '@/app/store/category';

interface Props {
	title: string;
	items: any[];
	categoryId: number;
	listClassName?: string;
	className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
	title,
	items,
	listClassName,
	className,
	categoryId,
}) => {
	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
	const intersectionRef = React.useRef(null);
	const intersection = useIntersection(intersectionRef, {
		threshold: 0.4,
	});

	React.useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId);
		}
	}, [intersection, categoryId, setActiveCategoryId]);

	return (
		<div className={className} id={title} ref={intersectionRef}>
			<Title text={title} size="lg" className="font-extrabold mb-5" />
			<div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
				{items.map((item) => (
					<ProductCard
						key={item.id}
						imageUrl={item.imageUrl}
						id={item.id}
						name={item.name}
						price={item.items[0].price}
					/>
				))}
			</div>
		</div>
	);
};