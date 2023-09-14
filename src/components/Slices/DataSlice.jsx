import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

    export const fetchData =  createAsyncThunk("dataSlice/fetchData",async()=>{
        const response = await axios.get("http://localhost:3000/tasks");
        return response.data;
    })
    export const addTask = createAsyncThunk("dataSlice/addTask", async (newTask) => {
        const response = await axios.post("http://localhost:3000/tasks", newTask);
        return response.data;
  });
  export const deleteTask = createAsyncThunk("dataSlice/deleteTask", async (taskId) => {
    await axios.delete(`http://localhost:3000/tasks/${taskId}`);
    return taskId;
  });
  export const updateTask = createAsyncThunk("dataSlice/updateTask", async (updatedTask) => {
    await axios.put(`http://localhost:3000/tasks/${updatedTask.id}`,updatedTask);
    return updatedTask;
  });


const dataSlice = createSlice({
    name: "data",
    initialState : [],
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchData.fulfilled,(state,action)=>{
            return action.payload
        });
        builder.addCase(addTask.fulfilled, (state, action) => {
            state.unshift(action.payload); 
        });
        builder.addCase(deleteTask.fulfilled,(state, action)=>{
            return state.filter(task => task.id !== action.payload);
        }); 
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const updatedTaskIndex = state.findIndex(
                (task) => task.id === action.payload.id
              );
              if (updatedTaskIndex !== -1) {
                state[updatedTaskIndex] = action.payload;
              }
          });
    }
})

export const {} = dataSlice.actions; 
export default dataSlice.reducer;    