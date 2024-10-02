import React from 'react';

interface Props {
	orderId: number;
	totalAmount: number;
}

export const OrderFailTemplate: React.FC<Props> = ({
	orderId,
	totalAmount,
}) => {
	return (
		<div>
			<h1>Неуспешная оплата заказа #{orderId}</h1>
			<p>
				К сожалению, мы были вынуждены отменить ваш заказ #{orderId} на сумму{' '}
				{totalAmount} ₽, так как оплата не была успешно проведена.
			</p>
			<p>
				Пожалуйста, проверьте свои платежные данные и повторите попытку оплаты
				на нашем сайте.{' '}
			</p>
		</div>
	);
};
