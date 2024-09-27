import React from 'react';
import { AddressInput, ErrorText, FormTextarea, WhiteBlock } from '..';
import { Input } from '../../ui';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
	className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
	const { control } = useFormContext();
	return (
		<WhiteBlock title="3. Адрес доставки" className={className}>
			<div className="flex flex-col gap-5">
				<Controller
					control={control}
					name="address"
					render={({ field, fieldState }) => (
						<>
							<AddressInput onChange={field.onChange} />
							{fieldState.error?.message && (
								<ErrorText text={fieldState.error.message} />
							)}
						</>
					)}
				/>

				<FormTextarea
					rows={5}
					className="text-base"
					placeholder="Комментарии к заказу"
					name="comment"
				/>
			</div>
		</WhiteBlock>
	);
};
