import { createStore } from "redux";
import Reducer from "./Reducer/Reducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, Reducer);
const store = createStore(persistedReducer);
let persistor = persistStore(store);
export { store, persistor };
