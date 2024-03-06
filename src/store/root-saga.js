import { all, call } from "redux-saga/effects";
import { categoriesSaga } from "./categories/categories.saga";
// this is an es6 generator function
// generator funtions allow us to pause executions within a function
/*
EX: function* gen(i) {
    this is a special generator key that executes i
    yield i
    yield i + 10
    return 25
}
const g = gen(5)
this will run only the first yield but done will be false
g.next()

NB: if there is no return after all the yields 
    run then the value will be undefined when the function is done

 */
export function* rootSaga() {
  yield all([call(categoriesSaga)]);
}
