import { prisma } from '@/prisma/prisma-client';

export interface GetSearchParams {
	query?: string;
	sort?: string;
	sizes?: string;
	pizzaTypes?: string;
	ingredients?: string;
	priceFrom?: string;
	priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
	const sizes = params.sizes?.split(',').map(Number);
	const pizzaTypes = params.pizzaTypes?.split(',').map(Number);
	const ingredientsIdArr = params.ingredients?.split(',').map(Number);
	const sortingOption = params.sort;

	const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
	const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

	const categories = await prisma.category.findMany({
		include: {
			products: {
				orderBy: {
					id: 'desc',
				},
				where: {
					ingredients: ingredientsIdArr
						? {
								some: {
									id: {
										in: ingredientsIdArr,
									},
								},
						  }
						: undefined,
					items: {
						some: {
							size: {
								in: sizes,
							},
							pizzaType: {
								in: pizzaTypes,
							},
							price: {
								gte: minPrice, // >=
								lte: maxPrice, // <=
							},
						},
					},
				},
				include: {
					ingredients: true,
					items: {
						where: {
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
						orderBy: {
							price: 'asc',
						},
					},
				},
			},
		},
	});

	switch (sortingOption) {
		case 'priceAsc':
			categories?.map((category) => {
				category.products.sort((a, b) => a.items[0].price - b.items[0].price);
			});
			break;
		case 'priceDesc':
			categories?.map((category) => {
				category.products.sort((a, b) => b.items[0].price - a.items[0].price);
			});
			break;
		default:
			break;
	}

	return categories;
};
