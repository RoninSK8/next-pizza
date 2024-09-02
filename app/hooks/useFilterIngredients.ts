import { ingredients } from './../../prisma/constants';
import { Ingredient } from '@prisma/client';
import { Api } from '../services/api-client';
import { useEffect, useState } from 'react';
import { useSet } from 'react-use';

type IngredientItem = Pick<Ingredient, 'id' | 'name'>;
interface ReturnProps {
	ingredients: IngredientItem[];
	loading: boolean;
	selectedIds: Set<string>;
	onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
	const [ingredients, setIngredients] = useState<ReturnProps['ingredients']>(
		[]
	);
	const [loading, setLoading] = useState(true);
	const [selectedIds, { toggle }] = useSet(new Set<string>([]));

	useEffect(() => {
		async function fetchIngredients() {
			try {
				setLoading(true);
				const ingredients = await Api.ingredients.getAll();
				setIngredients(
					ingredients.map((ingredient) => ({
						id: ingredient.id,
						name: ingredient.name,
					}))
				);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		fetchIngredients();
	}, []);

	return { ingredients, loading, onAddId: toggle, selectedIds };
};
