import { createSlice } from "@reduxjs/toolkit";

const urlSlice = createSlice({
    name: "url",
    initialState: { value: "http://localhost:3000/api/user" }, 
    reducers: {} 
});

export default urlSlice.reducer;
