import { all, call } from 'redux-saga/effects';

import { categoriesSaga } from './categories/category.saga';
import { userSgagas } from './user/user.saga';

// ES6 generator function signature is declared as function*
export function* rootSaga() {
  yield all([call(categoriesSaga), call(userSgagas)]);
}
