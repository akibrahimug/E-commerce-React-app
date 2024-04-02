/* eslint-disable no-undef */
import { compose, createStore, applyMiddleware, Middleware } from 'redux'
import logger from 'redux-logger'
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { rootReducer } from './root-reducer'
// import { thunk } from "redux-thunk";
// We can either use thunk or saga. Saga is more prefered
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga'
const sagaMiddleware = createSagaMiddleware()
const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter(
  (middleware): middleware is Middleware => Boolean(middleware),
)

// typescript
export type RootState = ReturnType<typeof rootReducer>
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}
type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
}

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))
// configure persist state in our local storgae using redux-persist
const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  // state i dont want to add to local
  // blacklist: ["user"],
  // the only state we want in local storage
  whitelist: ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer, undefined, composedEnhancers)

sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store)
