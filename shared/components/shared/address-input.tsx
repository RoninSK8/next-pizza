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
			token="0ac258eade5625f7addf27def66e3919dbe1213f"
			onChange={(data) => onChange?.(data?.value)}
		/>
	);
};
