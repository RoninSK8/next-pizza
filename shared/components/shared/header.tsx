'use client';
import React, { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Container } from './container';
import Image from 'next/image';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';
import toast from 'react-hot-toast';

import { ProfileButton } from './profile-button';
import { AuthModal } from './modals';
import { useRouter } from 'next/navigation';

interface Props {
	hasSearch?: boolean;
	hasCartButton?: boolean;
	className?: string;
}

export const Header: React.FC<Props> = ({
	className,
	hasSearch = true,
	hasCartButton = true,
}) => {
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);
	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		if (searchParams.has('paid')) {
			toast.success('Заказ успешно оплачен!');
			router.replace('/');
		}
		if (searchParams.has('verified')) {
			toast.success('Аккаунт успешно подтверждён!');
			router.replace('/');
		}
		if (searchParams.has('?verificationerror')) {
			toast.error('Неверный код!');
			router.replace('/');
		}
	});

	return (
		<header className={className}>
			<Container className="flex pt-6 pb-3 items-center justify-between">
				{/* Левая часть */}
				<Link href="/">
					<div className="flex items-center gap-4">
						<Image src="/logo.png" alt="Logo" width={35} height={35}></Image>
						<div>
							<h1 className="text-2xl uppercase font-black">Next Pizza</h1>
							<p className="text-sm text-gray-400 leading-3">
								вкусней уже некуда
							</p>
						</div>
					</div>
				</Link>

				{hasSearch && (
					<div className="mx-10 flex-1">
						<SearchInput />
					</div>
				)}

				{/* Правая часть */}
				<div className="flex items-center gap-3">
					<AuthModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
					<ProfileButton onClickSignIn={() => setIsModalOpen(true)} />
					{hasCartButton && <CartButton />}
				</div>
			</Container>
		</header>
	);
};
