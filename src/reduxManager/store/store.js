
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../RootReducers';
import thunk from 'redux-thunk';
import { persistStore, Persistor } from 'redux-persist';
const store = createStore(rootReducer, thunk);
const persistor = persistStore(store)

export const configStore = () => {
    return { store, persistor }
}

export function getStore() {
    return store
}

export function getPersistor() {
    return persistor
}