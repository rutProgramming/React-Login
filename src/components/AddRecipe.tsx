import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/reduxStore";
import { fetchRecipesAdd } from "../store/recipesStore";
import { Button, Card, CardContent, Grid2 as Grid, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { backgroundStyle, buttonStyles } from "../components/style";

const Schema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Min length is 20").min(20),
  ingredients: Yup.array()
    .of(Yup.string().required("Ingredient is required"))
    .min(1, "At least one ingredient is required"),
  instructions: Yup.string().required("Instructions is required").max(500, "Max length is 100"),
}).required();
const AddRecipe = () => {
  const dispatch = useDispatch<AppDispatch>();
  const id = useSelector((state: RootState) => state.id);
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(Schema) });
  useEffect(() => {
    setValue("ingredients", ingredients);
  }, [ingredients, setValue]);
  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };
  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };
  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };
  const onSubmit: SubmitHandler<{ ingredients?: string[]; title: string; description: string; instructions: string; }> = async (data) => {
    const requestBody = {
      title: data.title,
      description: data.description,
      instructions: data.instructions,
      ingredients: data.ingredients,
    };
    dispatch(fetchRecipesAdd({ recipe: requestBody, id: id }));
    reset();
    setIngredients(['']);
  };
  return (
    <Card sx={{ maxWidth: 500, mx: "auto", mt: 8, p: 2, boxShadow: 3, ...backgroundStyle}}>
      <CardContent sx={{ maxHeight: "60vh", overflowY: "auto" }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Add a New Recipe 🍽️
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} >
          <Grid container spacing={2} >
            <Grid size={{ xs: 6, md: 8 }}>
              <TextField fullWidth label="Title" {...register("title")} error={!!errors.title} helperText={errors.title?.message} />
            </Grid>
            <Grid size={{ xs: 6, md: 8 }}>
              <TextField fullWidth label="Description" multiline rows={3} {...register("description")} error={!!errors.description} helperText={errors.description?.message} />
            </Grid>
            <Grid size={{ xs: 8, md: 12 }}>
              <Typography variant="subtitle1">Ingredients:</Typography>
              {ingredients.map((ingredient, index) => (
                <Grid container spacing={1} alignItems="center" key={index} sx={{ mt: 1 }}>
                  <Grid size={{ xs: 6, md: 8 }}>
                    <TextField fullWidth value={ingredient} onChange={(e) => handleIngredientChange(index, e.target.value)} />
                  </Grid>
                  <Grid size={{ xs: 2, md: 4 }}>
                    <Button variant="contained" sx={{ mt: 1, ...buttonStyles }} onClick={() => removeIngredient(index)}>Remove</Button>
                  </Grid>
                </Grid>
              ))}
              <Button variant="contained" sx={{ mt: 1, ...buttonStyles }} onClick={addIngredient}>+ Add Ingredient</Button>
            </Grid>
            <Grid size={{ xs: 8, md: 12 }}>
              <TextField fullWidth label="Instructions" multiline rows={4} {...register("instructions")} error={!!errors.instructions} helperText={errors.instructions?.message} />
            </Grid>
            <Grid size={{ xs: 8, md: 12 }} textAlign="center">
              <Button variant="contained" sx={buttonStyles} type="submit">Add Recipe</Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};
export default AddRecipe;
