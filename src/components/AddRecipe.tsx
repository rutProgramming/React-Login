import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { RecipeType } from "../types/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/reduxStore";
import { fetchRecipesAdd } from "../store/recipesStore";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { buttonStyles } from "../components/style";

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
  const [ingredients, setIngredients] = useState<string[]>([""]); 
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

  const onSubmit = (data: Partial<RecipeType>) => {
    const recipe: RecipeType = {
    id: 0,
    title: data.title||"",
    description: data.description||"",
    authorId:   0,
    ingredients:    data.ingredients || [],
    instructions:   data.instructions||""
    }
    dispatch(fetchRecipesAdd(recipe));
    reset();
    setIngredients([""]); 
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title:
          <input {...register("title")} />
        </label>
        {errors.title && <div>{errors.title.message}</div>}
        <br />
        <label>Description:
          <input {...register("description")} />
        </label>
        {errors.description && <div>{errors.description.message}</div>}
        <br />

        <label>Ingredients:</label>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ ...buttonStyles, cursor: "pointer", ml: 1 }}
              onClick={() => removeIngredient(index)}
            >
              Remove Ingredient
            </Button>
          </div>
        ))}
        <Button
          variant="contained"
          sx={{ ...buttonStyles, cursor: "pointer", mt: 2 }}
          onClick={addIngredient}
        >
          Add Ingredient
        </Button>
        {errors.ingredients && <div>{errors.ingredients.message}</div>}
        <br />

        <label>Instructions:
          <input {...register("instructions")} />
        </label>
        {errors.instructions && <div>{errors.instructions.message}</div>}
        
        <Button
          variant="contained"
          sx={{ ...buttonStyles, cursor: "pointer", mt: 2 }}
          type="submit"
        >
          Add recipe
        </Button>
      </form>
    </>
  );
};
export default AddRecipe;
