'use client';
import React from 'react';
import { ErrorText, FormInput, WhiteBlock } from '..';
import { Input } from '../../ui';
import { Controller, useFormContext } from 'react-hook-form';
import { IMaskInput, IMaskMixin, useIMask } from 'react-imask';

interface Props {
	className?: string;
}

export const CheckoutPersonalInfo: React.FC<Props> = ({ className }) => {
	const { control } = useFormContext();

	const mask = [
		{
			mask: '+{7}(#00)-000-00-00', // +79999999999
			startsWith: '+',
			lazy: false,
			definitions: {
				'#': /[012345679]/,
			},
		},
		{
			mask: '+{7}(#00)-000-00-00', // +79999999999
			startsWith: '7',
			lazy: false,
			definitions: {
				'#': /[01234569]/,
			},
		},
		{
			mask: '+{7}(#00)-000-00-00', // 89999999999
			startsWith: '8',
			lazy: false,
			definitions: {
				'#': /[012345679]/,
			},
		},
	];

	return (
		<WhiteBlock title="2. Персональные данные" className={className}>
			<div className="grid grid-cols-2 gap-5">
				<FormInput name="firstName" placeholder="Имя" className="text-base" />
				<FormInput
					name="lastName"
					placeholder="Фамилия"
					className="text-base"
				/>
				<FormInput name="email" placeholder="E-mail" className="text-base" />
				<Controller
					control={control}
					name="phone"
					render={({ field, fieldState }) => (
						<>
							<IMaskInput
								className="h-12 text-md form-control flex w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								mask={mask}
								placeholder="+7(000)000-00-00"
								onAccept={field.onChange}
							/>
							{fieldState.error?.message && (
								<ErrorText text={fieldState.error.message} />
							)}
						</>
					)}
				/>
			</div>
		</WhiteBlock>
	);
};
