import { combineReducers, configureStore } from "@reduxjs/toolkit";
import doctors_slice from "./slices/Doctors-slice"
import Usersr from "./slices/Users-slice"
import storage from 'redux-persist/lib/storage';
import persistReducer from "redux-persist/es/persistReducer.js";
import persistStore from "redux-persist/es/persistStore.js";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  Users: Usersr,
  doctors:doctors_slice,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist:["Users","doctors"]
};
const reducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    // filmreducer: filmr,
    Reducers: reducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export default store;