'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
	onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
	return (
		<AddressSuggestions
			inputProps={{
				className:
					'h-12 text-md form-control flex w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
				placeholder: 'Начните вводить адрес, и воспользуйтесь подсказкой',
			}}
			token="0ac258eade5625f7addf27def66e3919dbe1213f"
			onChange={(data) => onChange?.(data?.value)}
		/>
	);
};
