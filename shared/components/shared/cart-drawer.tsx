'use client';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/shared/components/ui/sheet';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';

interface Props {
	className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
	children,
	className,
}) => {
	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="flex flex-col justify-between pb-o bg-[#F4F1EE]">
				<SheetHeader>
					<SheetTitle>
						В корзине <span className="font-bold">3 товара</span>
					</SheetTitle>
				</SheetHeader>
				<div className="-mx-6 mt-5 overflow-auto flex-1 scrollbar">
					<div className="mb-2">
						<CartDrawerItem
							id={1}
							details={getCartItemDetails(2, 30, [
								{
									name: 'Сыр',
									id: 0,
									price: 0,
									imageUrl: '',
									createdAt: new Date(),
									updatedAt: new Date(),
								},
								{
									name: 'Цыпленок',
									id: 0,
									price: 0,
									imageUrl: '',
									createdAt: new Date(),
									updatedAt: new Date(),
								},
							])}
							imageUrl={
								'https://media.dodostatic.net/image/r:584x584/11EE7D610D2925109AB2E1C92CC5383C.avif'
							}
							name={'Чоризо фреш'}
							price={419}
							quantity={1}
						/>
					</div>
				</div>
				<SheetFooter className="-m-6 bg-white p-8">
					<div className="w-full">
						<div className="flex mb-4">
							<span className="flex flex-1 text-lg text-neutral-500">
								Итого
								<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></div>
							</span>
							<span className="font-bold text-lg">520 ₽</span>
						</div>

						<Link href="/cart">
							<Button type="submit" className="w-full h-12 text-base">
								Оформить заказ
								<ArrowRight className="w-5 ml-2" />
							</Button>
						</Link>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
