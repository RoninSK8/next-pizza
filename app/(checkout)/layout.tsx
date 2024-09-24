import { Header } from '@/shared/components/shared';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Next Pizza | Корзина',
	description: 'Корзина',
};

export default function CheckoutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="min-h-screen bg-[#F4F1EE]">
			<Header
				className="border-b-grey-200"
				hasSearch={false}
				hasCartButton={false}
			/>
			{children}
		</main>
	);
}
