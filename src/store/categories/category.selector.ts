import { createSelector } from 'reselect';
import { CategoriesState } from './category.reducer';
import { CategoryMap } from './category.type';

const selectCategoryReducer = (state): CategoriesState => state.categories;

export const selectCategories = createSelector(
	[selectCategoryReducer],
	(categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
	// Categories Array, after first run as long as the array doesn't change there will be
	// no re-rendering.
	[selectCategories],
	(categories): CategoryMap => {
		return categories.reduce((acc, category) => {
			const { title, items } = category;
			acc[title.toLowerCase()] = items;
			return acc;
		}, {} as CategoryMap);
	}
);

export const selectIsCategoriesLoading = createSelector(
	[selectCategoryReducer],
	(categoriesSlice) => categoriesSlice.isLoading
);
