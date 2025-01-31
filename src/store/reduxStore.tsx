import { configureStore } from "@reduxjs/toolkit";
import reducer from "./recipesStore";


const store = configureStore({
    reducer: {
        recipes:reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store