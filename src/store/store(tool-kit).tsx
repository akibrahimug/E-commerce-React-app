import { configureStore, Middleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { rootReducer } from './root-reducer'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga'

const sagaMiddleware = createSagaMiddleware()
const middleWares: Middleware[] = [process.env.NODE_ENV !== 'production' && logger].filter(
  Boolean,
) as Middleware[]

// typescript
export type RootState = ReturnType<typeof rootReducer>

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
}

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

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(sagaMiddleware)
      .concat(middleWares),
})

sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store)
