import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';

export async function GET() {
	const {
		_min: { price: minPrice },
	} = await prisma.productItem.aggregate({
		_min: {
			price: true,
		},
	});
	const {
		_max: { price: maxPrice },
	} = await prisma.productItem.aggregate({
		_max: {
			price: true,
		},
	});

	return NextResponse.json({ minPrice, maxPrice });
}
