import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RecipeType } from "../types/types";
import { useContext } from "react";
import { Context } from "../App";

export const fetchRecipesGet = createAsyncThunk('recipes/fetchGet', async (_, thunkAPI) => {

    try {
        const response = await axios.get(`http://localhost:3000/api/recipes`);
        return response.data as RecipeType[];
    }
    catch (error: any) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const fetchRecipesAdd = createAsyncThunk('recipes/fetchAdd', async (recipe:RecipeType, thunkAPI) => {
    const [user] = useContext(Context);
    debugger
    try {
        const response = await axios.post(`http://localhost:3000/api/recipes`,
        recipe,{ headers: { 'user-id': user.id + '' } }
        );
        return response.data.recipe; 
    }
    catch (error: any) {
        return thunkAPI.rejectWithValue(error);
    }
});
const recipesSlice = createSlice({
    name: 'recipes',
    initialState: { 
        recipes: [] as RecipeType[],
        loading:false,
        error:""
        
     },
    reducers: { },
    extraReducers:(builder) =>{
        builder
        .addCase(fetchRecipesGet.pending,(state)=>{
            state.loading=true;
            state.error="";
            
        })
        .addCase(fetchRecipesGet.fulfilled, (state, action: PayloadAction<RecipeType[]>) => {
            state.loading = false;
            const existingRecipeIds = new Set(state.recipes.map(recipe => recipe.id));
            const uniqueRecipes = action.payload.filter(recipe => !existingRecipeIds.has(recipe.id));
            state.recipes = [...state.recipes, ...uniqueRecipes];
        })
        .addCase(fetchRecipesAdd.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
        .addCase(fetchRecipesAdd.fulfilled, (state, action: PayloadAction<RecipeType>) => {
            state.loading = false;
            state.recipes.push(action.payload); 
        })
        .addCase(fetchRecipesAdd.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to add recipe';
        });
        
    },
});
export default recipesSlice.reducer;