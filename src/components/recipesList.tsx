import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/reduxStore";
import { useEffect, useState } from "react";
import { fetchRecipesGet } from "../store/recipesStore";
import { RecipeType } from "../types/types";
import { Card, CardContent, Typography, Button, Container, Grid2 as Grid } from "@mui/material";
import { backgroundStyle, buttonStyles } from "./style";
import { Navigate } from "react-router";

export default function RecipeViewer() {
    const dispatch = useDispatch<AppDispatch>();
    const recipes = useSelector((state: RootState) => state.recipes.recipes);
    const [selectedRecipeId, setSelectedRecipeId] = useState(0);

    useEffect(() => {
        dispatch(fetchRecipesGet());
    }, [dispatch]);

    return (
        <Container sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 ,margin:10}}>

            <Grid >
                <Typography variant="h4" align="center" gutterBottom>
                    Recipe List
                </Typography>
                {recipes.length === 0 ? (
                    <Typography variant="h5" align="center">
                        No recipes available.
                    </Typography>
                ) : (
                    recipes.map((recipe: RecipeType) => (
                        <Card 
                            key={recipe.id} 
                            sx={{ mb: 2,...backgroundStyle, transition: "0.3s", "&:hover": { boxShadow: 6 } }}
                            onClick={() => setSelectedRecipeId(recipe.id)}
                        >
                            <CardContent>
                                <Typography variant="h6">{recipe.title}</Typography>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    sx={buttonStyles}
                                    onClick={() => setSelectedRecipeId(recipe.id)}
                                >
                                    View Recipe
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                )}
            </Grid>

            {selectedRecipeId && <Navigate to={`./ShowRecipe/${selectedRecipeId}`} />}
        </Container>
    );
}
