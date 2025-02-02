import { FormEvent, useContext, useRef, useState } from "react"
import { Button, Grid2 as Grid, Modal, Box, TextField} from "@mui/material";
import { User } from "../types/types";
import { Context } from "../App";
import axios from "axios";
import ProfilePage from "./ProfilePage";
import { buttonStyles, styleForm, StyleHeader } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reduxStore";
import { setId } from "../store/IdSlice";

export default () => {
    const [isLogin, setIsLogin] = useState(false)
    const [open, setOpen] = useState(false)
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [user, Dispatch] = useContext(Context);
    const [state, setState] = useState<string>("");
    const dispatch = useDispatch();
    const url = useSelector((state: RootState) => state.url.value);
    const id = useSelector((state: RootState) => state.id);

    const handleSubmit = async (event: FormEvent, type: "SIGN_UP" | "LOGIN") => {
        event.preventDefault();
        if (!emailRef.current?.value || !passwordRef.current?.value) {
            alert('Email and password are required.');
            return;
        }
        try {
            const res = await axios.post(
                url + (type === "SIGN_UP" ? "/register" : "/login"),
                {
                    email: emailRef.current?.value || user.email,
                    password: passwordRef.current?.value || user.password
                },
            )
            let userCurrent: User;
            if (type === "LOGIN") {
                userCurrent = res.data.user as User;
                dispatch(setId(res.data.user.id as number));
            }
            else {
                dispatch(setId(res.data.userId as number));
                userCurrent = {
                    id: id,
                    firstName: '',
                    lastName: '',
                    email: emailRef.current?.value || '',
                    address: '',
                    password: passwordRef.current?.value || '',
                    phone: ''
                };
            }
            Dispatch({ type, data: userCurrent })
            setOpen(false); setIsLogin(true);

        }
        catch (error: any) {
            if (error.response?.status === 401) {
                alert('Invalid credentials')
            }
            if (error.response?.status === 422) {
                alert('User already exists')
            }
            if (error.response?.status === 400) {
                alert('User already exists')
            }

        }
    }

    return (
        <>
            <Grid display={"flex"} alignItems={"center"} justifyContent={"flex-center"} alignContent={"flex-start"} >
                {!isLogin ? (
                    <>
                        <div style={StyleHeader}>
                            <Button  sx={buttonStyles}  
                             onClick={() => { setOpen(!open); setState("Login") }}>Login</Button>
                            <Button   sx={buttonStyles}  
                             onClick={() => { setOpen(!open); setState("Sign Up") }}>Sign Up</Button>
                        </div>
                    </>
                ) : (
                    <ProfilePage />
                )}

            </Grid>
            <Modal open={open} onClose={() => { setOpen(false); }}>
                <Box sx={styleForm}>
                    <form onSubmit={(event) => handleSubmit(event, state == "Sign Up" ? "SIGN_UP" : "LOGIN")}>
                        <TextField label="email" inputRef={emailRef} />
                        <TextField label="password" inputRef={passwordRef} />
                        <Button type="submit" sx={{color: "#a9643b"}}>{state === "Sign Up" ? "Sign Up" : "Login"}</Button>
                    </form>
                </Box>
            </Modal>
        </>)
}
