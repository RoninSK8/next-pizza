import {
	Categories,
	Container,
	Filters,
	ProductCard,
	SortPopup,
	Title,
	TopBar,
} from '@/components/shared';

export default function Home() {
	return (
		<>
			<Container className="mt-10">
				<Title text="Все пиццы" size="lg" className="font-extrabold" />
			</Container>
			<TopBar />
			<Container className="mt-10 pb-14">
				<div className="flex gap-[60px]">
					{/* Фильтрация */}
					<div className="w-[250px]">
						<Filters />
					</div>
					{/* Список товаров */}
					<div className="flex-1">
						<div className="flex flex-col gap-16">
							<ProductCard
								id={0}
								name="Чизбургер пицца"
								imageUrl="https://media.dodostatic.net/image/r:584x584/11EE7D61698827EE9B8DB6D0AEC53410.avif"
								price={550}
							/>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
