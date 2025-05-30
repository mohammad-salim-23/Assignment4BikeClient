import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice';
import { baseApi } from "./api/baseapi";
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import { cartReducer } from "./features/cart/cartSlice";
const persistConfig = {
    key: 'auth',
    storage
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistCartReducer = persistReducer(persistConfig, cartReducer);
export const store = configureStore({
    reducer:{
        [baseApi.reducerPath]: baseApi.reducer,
        auth: persistedAuthReducer ,
        cart: persistCartReducer
    },
    middleware: (getDefaultMiddlewares)=>
            getDefaultMiddlewares({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
                  }// redux er state unserialized object rakte pare na, error ase, eita use korle ei doroner problem ar hobe na
            }).concat(baseApi.middleware)
})


// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export const persistor = persistStore(store);