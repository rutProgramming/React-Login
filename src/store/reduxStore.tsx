import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "./recipesStore";
import urlReducer from "./UrlSlice";
import idReducer from "./IdSlice";

const store = configureStore({
    reducer: {
        recipes: recipesReducer,
        url: urlReducer,   
        id: idReducer,     
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export default store;
