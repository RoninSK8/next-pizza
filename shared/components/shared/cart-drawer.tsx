'use client';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/shared/components/ui/sheet';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails, normalizeCountForm } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import Image from 'next/image';
import { Title } from './title';
import { useCart } from '@/shared/hooks';

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [redirectingToCheckout, setRedirectingToCheckout] =
		React.useState(false);
	const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();

	const productsTotalCount = items.reduce(
		(acc, item) => acc + item.quantity,
		0
	);

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="flex flex-col justify-between pb-o bg-[#F4F1EE]">
				<div
					className={cn(
						'flex flex-col h-full',
						!totalAmount && 'justify-center'
					)}
				>
					{totalAmount > 0 && (
						<SheetHeader>
							<SheetTitle>
								В корзине{' '}
								<span className="font-bold">
									{productsTotalCount}{' '}
									{normalizeCountForm(productsTotalCount, [
										'товар',
										'товара',
										'товаров',
									])}
								</span>
							</SheetTitle>
						</SheetHeader>
					)}

					{!totalAmount && (
						<div className="flex flex-col items-center justify-center w-72 mx-auto">
							<Image
								src="/assets/images/empty-box.png"
								alt="empty-cart"
								width={120}
								height={120}
							/>
							<Title
								text="Корзина пустая"
								size="sm"
								className="text-center font-bold my-2"
							/>
							<p className="text-center text-neutral-500 mb-5">
								Добавьте товар в корзину, чтобы совершить заказ
							</p>
							<SheetClose>
								<Button className="w-56 h-12 text-base" size="lg">
									<ArrowLeft className="w-5 mr-2" />
									Вернуться назад
								</Button>
							</SheetClose>
						</div>
					)}

					{totalAmount > 0 && (
						<>
							<div className="-mx-6 mt-5 overflow-auto flex-1 scrollbar">
								{items.map((item) => (
									<div className="mb-2" key={item.id}>
										<CartDrawerItem
											id={item.id}
											details={
												item.pizzaSize && item.pizzaType
													? getCartItemDetails(
															item.ingredients,
															item.pizzaType as PizzaType,
															item.pizzaSize as PizzaSize
													  )
													: ''
											}
											disabled={item.disabled}
											imageUrl={item.imageUrl}
											name={item.name}
											price={item.price}
											quantity={item.quantity}
											onClickCountButton={(type) =>
												onClickCountButton(item.id, item.quantity, type)
											}
											onClickRemoveButton={() => removeCartItem(item.id)}
										/>
									</div>
								))}
							</div>
							<SheetFooter className="-m-6 bg-white p-8">
								<div className="w-full">
									<div className="flex mb-4">
										<span className="flex flex-1 text-lg text-neutral-500">
											Итого
											<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></div>
										</span>
										<span className="font-bold text-lg">{totalAmount} ₽</span>
									</div>

									<Link href="/checkout">
										<Button
											onClick={() => setRedirectingToCheckout(true)}
											loading={redirectingToCheckout}
											type="submit"
											className="w-full h-12 text-base"
										>
											Оформить заказ
											<ArrowRight className="w-5 ml-2" />
										</Button>
									</Link>
								</div>
							</SheetFooter>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
};
