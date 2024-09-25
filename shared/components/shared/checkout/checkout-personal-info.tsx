import React from 'react';
import { FormInput, WhiteBlock } from '..';
import { Input } from '../../ui';

interface Props {
	className?: string;
}

export const CheckoutPersonalInfo: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock title="2. Персональные данные" className={className}>
			<div className="grid grid-cols-2 gap-5">
				<Input name="fistName" placeholder="Имя" className="text-base" />
				<Input name="lastName" placeholder="Фамилия" className="text-base" />
				<Input name="email" placeholder="E-mail" className="text-base" />
				<FormInput name="phone" placeholder="Телефон" className="text-base" />
			</div>
		</WhiteBlock>
	);
};
