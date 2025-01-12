export type User  ={
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

