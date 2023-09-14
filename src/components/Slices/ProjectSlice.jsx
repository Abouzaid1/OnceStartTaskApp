import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

    export const fetchProject =  createAsyncThunk("dataSlice/fetchProject",async()=>{
        const response = await axios.get("https://taskmanagment2.onrender.com/Projects");
        return response.data;
    })
    export const addProject = createAsyncThunk("dataSlice/addProject", async (newProject) => {
        const response = await axios.post("https://taskmanagment2.onrender.com/Projects", newProject);
        return response.data;
    });
    export const deleteProject = createAsyncThunk("dataSlice/deleteProject", async (projectId) => {
        await axios.delete(`https://taskmanagment2.onrender.com/Projects/${projectId}`);
        return projectId;
    });
    export const updateProject = createAsyncThunk("dataSlice/updateProject", async (updatedProject) => {
        await axios.put(`https://taskmanagment2.onrender.com/Projects/${updatedProject.id}`,updatedProject);
        return updatedProject;
    });
    // export const fetchProject =  createAsyncThunk("dataSlice/fetchProject",async()=>{
    //     const response = await axios.get("http://localhost:3000/Projects");
    //     return response.data;
    // })
    // export const addProject = createAsyncThunk("dataSlice/addProject", async (newProject) => {
    //     const response = await axios.post("http://localhost:3000/Projects", newProject);
    //     return response.data;
    // });
    // export const deleteProject = createAsyncThunk("dataSlice/deleteProject", async (projectId) => {
    //     await axios.delete(`http://localhost:3000/Projects/${projectId}`);
    //     return projectId;
    // });
    // export const updateProject = createAsyncThunk("dataSlice/updateProject", async (updatedProject) => {
    //     await axios.put(`http://localhost:3000/Projects/${updatedProject.id}`,updatedProject);
    //     return updatedProject;
    // });


const peojectSlice = createSlice({
    name: "project",
    initialState : [],
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchProject.fulfilled,(state,action)=>{
            return action.payload
        });
        builder.addCase(addProject.fulfilled, (state, action) => {
            state.unshift(action.payload); 
        });
        builder.addCase(deleteProject.fulfilled,(state, action)=>{
            return state.filter(task => task.id !== action.payload);
        }); 
        builder.addCase(updateProject.fulfilled, (state, action) => {
            const updatedTaskIndex = state.findIndex(
                (task) => task.id === action.payload.id
              );
              if (updatedTaskIndex !== -1) {
                state[updatedTaskIndex] = action.payload;
              }
          });
    }
})

export const {} = peojectSlice.actions; 
export default peojectSlice.reducer;    