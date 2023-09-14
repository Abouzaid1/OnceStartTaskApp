import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

    export const fetchUser =  createAsyncThunk("dataSlice/fetchUser",async()=>{
        const response = await axios.get("https://taskmanagment2.onrender.com/Peaple");
        return response.data;
    })
    export const addUser = createAsyncThunk("dataSlice/addUser", async (newUser) => {
        const response = await axios.post("https://taskmanagment2.onrender.com/Peaple", newUser);
        return response.data;
    });
    export const deleteUser = createAsyncThunk("dataSlice/deleteUser", async (userId) => {
        await axios.delete(`https://taskmanagment2.onrender.com/Peaple/${userId}`);
        return userId;
    });
    export const updateUser = createAsyncThunk("dataSlice/updateUser", async (UpdatedUser) => {
        await axios.put(`https://taskmanagment2.onrender.com/Peaple/${UpdatedUser.id}`,UpdatedUser);
        return UpdatedUser;
    });

    // export const fetchUser =  createAsyncThunk("dataSlice/fetchUser",async()=>{
    //     const response = await axios.get(" http://localhost:3000/Peaple");
    //     return response.data;
    // })
    // export const addUser = createAsyncThunk("dataSlice/addUser", async (newUser) => {
    //     const response = await axios.post(" http://localhost:3000/Peaple", newUser);
    //     return response.data;
    // });
    // export const deleteUser = createAsyncThunk("dataSlice/deleteUser", async (userId) => {
    //     await axios.delete(` http://localhost:3000/Peaple/${userId}`);
    //     return userId;
    // });
    // export const updateUser = createAsyncThunk("dataSlice/updateUser", async (UpdatedUser) => {
    //     await axios.put(` http://localhost:3000/Peaple/${UpdatedUser.id}`,UpdatedUser);
    //     return UpdatedUser;
    // });


const peojectSlice = createSlice({
    name: "project",
    initialState : [],
    reducers: {
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchUser.fulfilled,(state,action)=>{
            return action.payload
        });
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.unshift(action.payload); 
        });
        builder.addCase(deleteUser.fulfilled,(state, action)=>{
            return state.filter(task => task.id !== action.payload);
        }); 
        builder.addCase(updateUser.fulfilled, (state, action) => {
            const updatedUser = state.findIndex(
                (task) => task.id === action.payload.id
              );
              if (updatedUser !== -1) {
                state[updatedUser] = action.payload;
              }
          });
    }
})

export const {} = peojectSlice.actions; 
export default peojectSlice.reducer;    