'use client';
import React, { useEffect } from 'react';
import { cn } from '@/shared/lib/utils';
import { Container } from './container';
import Image from 'next/image';
import { Button } from '../ui';
import { User } from 'lucide-react';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

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
	const searchParams = new URLSearchParams(window.location.search);
	useEffect(() => {
		if (searchParams.has('paid')) {
			toast.success('Заказ успешно оплачен!');
			searchParams.delete('paid');
			window.history.replaceState(
				{},
				'',
				`${window.location.pathname}?${searchParams.toString()}`
			);
		}
	}, [searchParams]);

	return (
		<header className={cn('border-b', className)}>
			<Container className="flex py-8 items-center justify-between">
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
					<Button variant="outline" className="flex items-center gap-1">
						<User size={16} />
						Войти
					</Button>
					{hasCartButton && <CartButton />}
				</div>
			</Container>
		</header>
	);
};
