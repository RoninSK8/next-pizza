import {
	Container,
	Filters,
	ProductsGroupList,
	TopBar,
	Stories,
} from '@/shared/components/shared';
import { Suspense } from 'react';
import { findPizzas, GetSearchParams } from '@/shared/lib/find-pizzas';

export default async function Home({
	searchParams,
}: {
	searchParams: GetSearchParams;
}) {
	const categories = await findPizzas(searchParams);

	const hasProducts = categories.some(
		(category) => category.products.length > 0
	);

	return (
		<>
			<TopBar
				categories={categories.filter(
					(category) => category.products.length > 0
				)}
			/>
			<Stories />

			<Container className="mt-10 pb-14">
				<div className="flex gap-[80px]">
					{/* Фильтрация */}
					<div className="w-[250px]">
						<Suspense>
							<Filters />
						</Suspense>
					</div>
					{/* Список товаров */}
					<div className="flex-1">
						<div className="flex flex-col gap-16">
							{hasProducts ? (
								categories.map(
									(category) =>
										category.products.length > 0 && (
											<ProductsGroupList
												key={category.id}
												title={category.name}
												categoryId={category.id}
												items={category.products}
											/>
										)
								)
							) : (
								<div className="text-left text-xl m-[30px]">
									Не удалось найти товары по заданным фильтрам.
								</div>
							)}
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
