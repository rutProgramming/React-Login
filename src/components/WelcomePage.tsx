import { FormEvent, useContext, useRef, useState } from "react"
import {
    Button,
    Grid2 as Grid,
    Modal,
    Box,
    TextField
} from "@mui/material";
import { User } from "../types/types";
import { Context } from "../App";
import axios from "axios";
import ProfilePage from "./ProfilePage";
import { styleForm, StyleHeader } from "./style";

export default () => {
    const [isLogin, setIsLogin] = useState(false)
    const [open, setOpen] = useState(false)
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [user, Dispatch] = useContext(Context);
    const url = 'http://localhost:3000/api/user'
    const [state, setState] = useState<string>("");

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
                user.id = res.data.user.id as number

            }
            else {

                user.id = res.data.userId as number
                userCurrent = {
                    id: user.id,
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
                            <Button color="primary" onClick={() => { setOpen(!open); setState("Login") }}>Login</Button>
                            <Button color="primary" onClick={() => { setOpen(!open); setState("Sign Up") }}>Sign Up</Button>
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
                        <Button type="submit">{state === "Sign Up" ? "Sign Up" : "Login"}</Button>
                    </form>
                </Box>
            </Modal>
        </>)
}
