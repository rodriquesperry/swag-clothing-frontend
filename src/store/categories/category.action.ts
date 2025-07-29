import { createAction, Action, ActionWithPayload } from '../../utils/reducers/reducer.utils';
// import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import { CATEGORIES_ACTION_TYPES, Category } from './category.type';

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;
export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>
export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>

//  We need to create a Union(|) with the action types our reducer can accept. This is what we will use in our reducer
 export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed

//***** Begin Redux actions *****//
// No payload needed, only setting isLoading to true
export const fetchCategoriesStart = (): FetchCategoriesStart =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray: Category[]): FetchCategoriesSuccess =>
	createAction(
		CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
		categoriesArray
	);

export const fetchCategoriesFailed = (error: Error): FetchCategoriesFailed =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

  // You use the actions from above in the Async function
// export const fetchCategoriesAsync = () => async (dispatch) => {
// 	dispatch(fetchCategoriesStart());
// 	try {
// 		const categoriesArray = await getCategoriesAndDocuments();
// 		dispatch(fetchCategoriesSuccess(categoriesArray));
// 	} catch (error) {
// 		dispatch(fetchCategoriesFailed(error));
// 	}
// };
