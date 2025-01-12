import { FormEvent, useContext, useRef } from "react";
import { Context } from "../App";
import { Box, Button, Modal, TextField } from "@mui/material";
import {  UserIdContext } from "./WelcomePage";
import axios from "axios";
import { styleForm } from "./style";

export default ({onClose}: {   onClose: () => void }) => {
    const [user, Dispatch] = useContext(Context);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const adressRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const url = 'http://localhost:3000/api/user'
    const userID = useContext<number>(UserIdContext);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const updatedUser = {
            firstName: firstNameRef.current?.value || user.firstName,
            lastName: lastNameRef.current?.value || user.lastName,
            email: emailRef.current?.value || user.email,
            address: adressRef.current?.value || user.address,
            phone: phoneRef.current?.value || user.phone,
        };
        try {
            const res = await axios.put(
                url,updatedUser,{ headers: { 'user-id': userID + '' } }
            )           
            Dispatch({ type: 'UPDATE', data: res.data })
            onClose();
        }
        catch (error) {
            console.error(error);
            alert('An error occurred while updating. Please try again.');
        } finally {
            firstNameRef.current!.value = ''
            lastNameRef.current!.value = ''
            emailRef.current!.value = ''
            passwordRef.current!.value = ''
            adressRef.current!.value = ''
            phoneRef.current!.value = ''
        }
    }
   
    return (
        <>
            <Modal open={true} onClose={onClose}>
                <Box sx={styleForm}>
                    <form onSubmit={handleSubmit}>
                        <TextField label='firstName' inputRef={firstNameRef} defaultValue={user.firstName}/>
                        <TextField label='lastfirstName' inputRef={lastNameRef} defaultValue={user.lastName}/>
                        <TextField label='email' inputRef={emailRef} defaultValue={user.email}/>
                        <TextField label='adress' inputRef={adressRef} defaultValue={user.address}/>
                        <TextField label='password' inputRef={passwordRef} defaultValue={user.password} />
                        <TextField label='phone' inputRef={phoneRef} defaultValue={user.phone}/>
                        <Button type="submit">save changes</Button>
                    </form>
                </Box>
            </Modal>


        </>)
}