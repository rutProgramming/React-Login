export type User  ={
  id:number
  firstName:string,
  lastName:string,
  address:string,
  email:string,
  password:string,
  phone:string 
}
export type Puser = Partial<User>
export type ActionReducer = {
  type: "LOGIN" | "SIGN_UP" | "UPDATE";
  data: Puser 
}
export type ContextType = [Puser, React.Dispatch<ActionReducer>];

export type RecipeType = {
    id: number,
    title: string,
    description: string,
    authorId: number,
    ingredients: string[],
    instructions: string
}