import {
	Categories,
	Container,
	Filters,
	ProductCard,
	ProductsGroupList,
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
				<div className="flex gap-[80px]">
					{/* Фильтрация */}
					<div className="w-[250px]">
						<Filters />
					</div>
					{/* Список товаров */}
					<div className="flex-1">
						<div className="flex flex-col gap-16">
							<ProductsGroupList
								title={'Пиццы'}
								items={[
									{
										id: 0,
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/rhttps://media.dodostatic.net/image/r:584x584/11EE7D610A62D78598406363A9A8AD65.avif',
										items: [{ price: 550 }],
									},
									{
										id: 1,
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/rhttps://media.dodostatic.net/image/r:584x584/11EE7D610A62D78598406363A9A8AD65.avif',
										items: [{ price: 550 }],
									},
									{
										id: 2,
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/rhttps://media.dodostatic.net/image/r:584x584/11EE7D610A62D78598406363A9A8AD65.avif',
										items: [{ price: 550 }],
									},
									{
										id: 3,
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/rhttps://media.dodostatic.net/image/r:584x584/11EE7D610A62D78598406363A9A8AD65.avif',
										items: [{ price: 550 }],
									},
									{
										id: 4,
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/rhttps://media.dodostatic.net/image/r:584x584/11EE7D610A62D78598406363A9A8AD65.avif',
										items: [{ price: 550 }],
									},
									{
										id: 5,
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/rhttps://media.dodostatic.net/image/r:584x584/11EE7D610A62D78598406363A9A8AD65.avif',
										items: [{ price: 550 }],
									},
									{
										id: 6,
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/rhttps://media.dodostatic.net/image/r:584x584/11EE7D610A62D78598406363A9A8AD65.avif',
										items: [{ price: 550 }],
									},
								]}
								categoryId={1}
							/>
							<ProductsGroupList
								title={'Комбо'}
								items={[
									{
										id: 11,
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/rhttps://media.dodostatic.net/image/r:584x584/11EE7D610A62D78598406363A9A8AD65.avif',
										items: [{ price: 550 }],
									},
									{
										id: 12,
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/rhttps://media.dodostatic.net/image/r:584x584/11EE7D610A62D78598406363A9A8AD65.avif',
										items: [{ price: 550 }],
									},
									{
										id: 23,
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/rhttps://media.dodostatic.net/image/r:584x584/11EE7D610A62D78598406363A9A8AD65.avif',
										items: [{ price: 550 }],
									},
									{
										id: 34,
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/rhttps://media.dodostatic.net/image/r:584x584/11EE7D610A62D78598406363A9A8AD65.avif',
										items: [{ price: 550 }],
									},
									{
										id: 45,
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/rhttps://media.dodostatic.net/image/r:584x584/11EE7D610A62D78598406363A9A8AD65.avif',
										items: [{ price: 550 }],
									},
									{
										id: 56,
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/rhttps://media.dodostatic.net/image/r:584x584/11EE7D610A62D78598406363A9A8AD65.avif',
										items: [{ price: 550 }],
									},
									{
										id: 67,
										name: 'Пицца',
										imageUrl:
											'https://media.dodostatic.net/image/rhttps://media.dodostatic.net/image/r:584x584/11EE7D610A62D78598406363A9A8AD65.avif',
										items: [{ price: 550 }],
									},
								]}
								categoryId={2}
							/>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
