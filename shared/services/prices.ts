import { ApiRoutes } from './constants';
import { axiosInstance } from './instance';

export type MinMaxPrices = { minPrice: number; maxPrice: number };

export const getMinAndMaxPrices = async (): Promise<MinMaxPrices> => {
	const { data } = await axiosInstance.get<MinMaxPrices>(ApiRoutes.PRICES);
	return data;
};
