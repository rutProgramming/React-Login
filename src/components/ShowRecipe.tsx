import { Button, Card, CardContent, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { RootState } from "../store/reduxStore";
import { useParams } from "react-router";
import { buttonStyles } from "./style";
import { useState } from "react";

const ShowRecipe = () => {
    const {id} = useParams()
    const [clicked, setClicked] = useState(false);
    const recipes = useSelector((state: RootState) => state.recipes.recipes);
    const recipe = recipes.find(recipe => recipe.id.toString() === id);   
    return (
        <>
             {recipe ? (
                <Card sx={{ 
                    mb: 4, 
                    borderRadius: 2, 
                    boxShadow: 3, 
                    backgroundColor: "rgba(255, 255, 255, 0.6)", 
                    backdropFilter: "blur(10px)", 
                    padding: 2,
                    margin:20
                }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom sx={{ color: buttonStyles.backgroundColor }}>
                            {recipe.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            {recipe.description}
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={{ color: buttonStyles.backgroundColor }}>
                            Ingredients
                        </Typography>
                        <ul>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    <Typography variant="body2">{ingredient}</Typography>
                                </li>
                            ))}
                        </ul>
                        <Typography variant="h6" gutterBottom sx={{ color: buttonStyles.backgroundColor }}>
                            Instructions
                        </Typography>
                        <Typography variant="body2">{recipe.instructions}</Typography>
                        <Button 
                            variant="contained" 
                            sx={{ 
                                ...buttonStyles, 
                                cursor: "pointer", 
                                mt: 2 
                            }}
                            onClick={() => setClicked(!clicked)}
                        >
                            {clicked ? " Cook Now 👏" : "Cook Now"}
                        </Button>
                    </CardContent>
                </Card>
            ) : null}
        </>
    );
    
}
export default ShowRecipe