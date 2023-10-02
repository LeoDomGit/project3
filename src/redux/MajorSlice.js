import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
export const getMajors = createAsyncThunk('majors/getMajors' , async ()=>{
    return fetch("http://127.0.0.1:8000/api/activemajors")
    .then((res)=>res.json());
})
export const MajorSlice = createSlice({
    name: 'majors',
    initialState:{
        majors:[],
        loading:false,
    },
    extraReducers:{
        [getMajors.pending]: (state,action)=>{
            state.loading=true;
        },
        [getMajors.fulfilled]:(state,action)=>{
            state.loading=false;
            state.majors= action.payload
        },
        [getMajors.rejected]:(state,action)=>{
            state.loading=false;
        }
    }
})

export default MajorSlice.reducer