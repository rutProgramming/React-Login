import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "./reduxStore";
import { useEffect } from "react";
import { fetchRecipesGet } from "./recipesStore";
import { RecipeType } from "../types/types";
export default () => {
    const dispatch = useDispatch<AppDispatch>();
    const recipes = useSelector((state: RootState) => state.recipes.recipes)
    useEffect(() => {
        dispatch(fetchRecipesGet())
    }, [dispatch]);

    return (
        <>
            {recipes.length === 0 ? (
                <div>No recipes available.</div>
            ) : (
                recipes.map((recipe: RecipeType) => (
                    <div key={recipe.id}>{recipe.title}
                    </div>

                ))
            )}
        </>
    );
}