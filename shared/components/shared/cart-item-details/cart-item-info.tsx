import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { getCartItemDetails } from '@/shared/lib';
import { capitalizeLowercaseText } from '@/shared/lib/capitalize-lowercase-text';
import { Ingredient } from '@prisma/client';

interface Props {
	name: string;
	details: string;
}

export const CartItemInfo: React.FC<Props> = ({ name, details }) => {
	return (
		<div>
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
			</div>
			{details.length > 0 && (
				<p className="text-xs text-gray-400">
					{capitalizeLowercaseText(details)}
				</p>
			)}
		</div>
	);
};
