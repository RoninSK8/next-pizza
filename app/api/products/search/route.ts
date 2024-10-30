import { prisma } from '@/prisma/prisma-client';
import { capitalizeLowercaseText } from '@/shared/lib/capitalize-lowercase-text';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const query = request.nextUrl.searchParams.get('query') || '';

	// Need this in order to use case-insensitive search, which breaks when Vercel is dealing with cyrillic text
	const capitalizedQuery = capitalizeLowercaseText(query);
	const lowercaseQuery = query.toLocaleLowerCase();

	const products = await prisma.product.findMany({
		where: {
			OR: [
				{ name: { contains: query, mode: 'insensitive' } },
				{ name: { contains: capitalizedQuery, mode: 'insensitive' } },
				{ name: { contains: lowercaseQuery, mode: 'insensitive' } },
			],
		},
		take: 5,
	});
	return NextResponse.json(products);
}
