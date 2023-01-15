import { configureStore } from '@reduxjs/toolkit'
import accountReducer, { accountType } from './slices/accountSlice'
import collectionReducer, { collectionType } from './slices/collectionSlice'

export interface storeType {
    account: accountType
    collection: collectionType
}

const store = configureStore({
    reducer: {
        account: accountReducer,
        collection: collectionReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;