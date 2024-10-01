'use server';
import { prisma } from '@/prisma/prisma-client';
import { PayOrderTemplate } from '@/shared/components/shared';
import { CheckoutFormValues } from '@/shared/constants';
import { sendEmail } from '@/shared/lib';
import { OrderStatus } from '@prisma/client';
import { cookies } from 'next/headers';

export async function createOrder(data: CheckoutFormValues) {
	try {
		const cookieStore = cookies();
		const cartToken = cookieStore.get('cartToken')?.value;
		if (!cartToken) {
			throw new Error('Cart token not found');
		}

		// Находим корзину по токену
		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productItem: {
							include: {
								product: true,
							},
						},
					},
				},
			},
			where: {
				token: cartToken,
			},
		});

		// Проверка на наличие корзины
		if (!userCart) {
			throw new Error('Cart not found');
		}

		// Проверка на наличие продуктов
		if (userCart?.totalAmount === 0) {
			throw new Error('Cart is empty');
		}

		// Создание заказа
		const order = await prisma.order.create({
			data: {
				token: cartToken,
				fullName: data.firstName + ' ' + data.lastName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				totalAmount: userCart.totalAmount,
				status: OrderStatus.PENDING,
				items: JSON.stringify(userCart.items),
			},
		});

		// Очистка корзины
		await prisma.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalAmount: 0,
			},
		});

		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		});

		// TODO: сделать создание ссылки оплаты

		await sendEmail(
			data.email,
			'Next Pizza / Оплатите заказ №' + order.id,
			PayOrderTemplate({
				orderId: order.id,
				totalAmount: order.totalAmount,
				paymentUrl: 'https://www.youtube.com/',
			})
		);
	} catch (error) {
		console.log('[ORDER_CREATE] Server error', error);
	}
	const token = '123';

	await prisma.order.create({
		data: {
			token,
			fullName: data.firstName + ' ' + data.lastName,
			email: data.email,
			phone: data.phone,
			address: data.address,
			comment: data.comment,
			totalAmount: 1500,
			status: OrderStatus.PENDING,
			items: [],
		},
	});

	return 'https://www.youtube.com/';
}
