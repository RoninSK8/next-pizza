import React from 'react';
import { WhiteBlock } from '..';
import { Input, Textarea } from '../../ui';

interface Props {
	className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock title="3. Адрес доставки" className={className}>
			<div className="flex flex-col gap-5">
				<Input
					name="address"
					placeholder="Введите адрес..."
					className="text-base"
				/>

				<Textarea
					rows={5}
					className="text-base"
					placeholder="Комментарии к заказу"
				/>
			</div>
		</WhiteBlock>
	);
};
