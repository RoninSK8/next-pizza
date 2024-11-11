import { useEffect, useState } from 'react';
import { Api } from '../services/api-client';
import { MinMaxPrices } from '../services/prices';

export const useMinAndMaxPrices = () => {
	const [minMaxprices, setMinMaxPrices] = useState<MinMaxPrices>({
		minPrice: 0,
		maxPrice: 1000,
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchMinAndMaxPrices() {
			try {
				setLoading(true);
				const minMaxprices = await Api.prices.getMinAndMaxPrices();

				setMinMaxPrices(minMaxprices);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		fetchMinAndMaxPrices();
	}, []);

	return { minMaxprices, minMaxPricesLoading: loading };
};
