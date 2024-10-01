'use server';
import { prisma } from '@/prisma/prisma-client';
import { PayOrderTemplate } from '@/shared/components/shared';
import { CheckoutFormValues } from '@/shared/constants';
import { createPayment, sendEmail } from '@/shared/lib';
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

		// Создание платежа
		const paymentData = await createPayment({
			amount: order.totalAmount,
			description: 'Оплатаа заказа #' + order.id,
			orderId: order.id,
		});

		// Проверка на создание платежа
		if (!paymentData) {
			throw new Error('Payment data not found');
		}

		// Обновление статуса заказа
		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				paymentId: paymentData.id,
			},
		});

		const paymentUrl = paymentData.confirmation.confirmation_url;
		// Отправка письма

		await sendEmail(
			data.email,
			'Next Pizza / Оплатите заказ №' + order.id,
			PayOrderTemplate({
				orderId: order.id,
				totalAmount: order.totalAmount,
				paymentUrl,
			})
		);

		return paymentUrl;
	} catch (error) {
		console.log('[ORDER_CREATE] Server error', error);
	}
}
