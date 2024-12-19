import {configureStore} from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";
import cartSlice from "./cartSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {combineReducers} from 'redux';
import sliderSlice from "./sliderSlice";
import NavSlice from "./NavSlice";
import searchSlice from "./searchSlice";
import drawerSlice from "./drawerSlice";
import stateSlice from "./stateSlice";

const rootReducer = combineReducers({
  slider: sliderSlice.reducer,
  products: productsSlice.reducer,
  cart: cartSlice.reducer,
  nav:NavSlice.reducer,
  search:searchSlice.reducer,
  filter:drawerSlice.reducer,
  state:stateSlice.reducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart','nav','search','filter'],//slice in which we use persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);  

const webStore = configureStore({
  reducer: persistedReducer, // Use persistedReducer here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignore redux-persist actions in middleware checks
      },
    }),
});

export const persistor = persistStore(webStore);




export default webStore;
