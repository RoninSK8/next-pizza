import { useEffect, useRef } from 'react';
import { Filters } from './use-filters';
import qs from 'qs';
import { useRouter } from 'next/navigation';

export const useQueryFilters = (filters: Filters) => {
	const isMounted = useRef(false);
	const router = useRouter();
	const debounceTimer = useRef<number | null>(null);

	useEffect(() => {
		if (isMounted.current) {
			const params = {
				...filters.prices,
				pizzaTypes: Array.from(filters.pizzaTypes),
				sizes: Array.from(filters.sizes),
				ingredients: Array.from(filters.selectedIngredients),
				sort: filters.sort,
			};

			const query = qs.stringify(params, {
				arrayFormat: 'comma',
			});

			if (debounceTimer.current) {
				window.clearTimeout(debounceTimer.current);
			}

			debounceTimer.current = window.setTimeout(() => {
				router.push(`?${query}`, { scroll: false });
			}, 200);
		}
		isMounted.current = true;
	}, [filters, router]);
};
