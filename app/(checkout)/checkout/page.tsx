import { Container, Title, WhiteBlock } from '@/shared/components/shared';
import { Input, Textarea } from '@/shared/components/ui';

export default function CheckoutPage() {
	return (
		<Container>
			<Title
				text="Оформление заказа"
				className="font-extrabold mb-8 text-[36px]"
			/>

			<div className="flex gap-10">
				{/* Левая часть */}
				<div className="flex flex-col gap-10 flex-1 mb-20">
					<WhiteBlock title="1. Корзина">123123</WhiteBlock>
					<WhiteBlock title="2. Персональные данные">
						<div className="grid grid-cols-2 gap-5">
							<Input name="fistName" placeholder="Имя" className="text-base" />
							<Input
								name="lastName"
								placeholder="Фамилия"
								className="text-base"
							/>
							<Input name="email" placeholder="E-mail" className="text-base" />
							<Input name="phone" placeholder="Телефон" className="text-base" />
						</div>
					</WhiteBlock>
					<WhiteBlock title="3. Адрес доставки">
						<div className="flex flex-col gap-5">
							<Input
								name="address"
								placeholder="Введите адрес..."
								className="text-base"
							/>

							<Textarea
								rows={5}
								className="text-base"
								placeholder="Комментарии к заказу"
							/>
						</div>
					</WhiteBlock>
				</div>
				{/* Правая часть */}
			</div>
		</Container>
	);
}
