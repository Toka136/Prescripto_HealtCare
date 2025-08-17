import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const Fetch_doctors=createAsyncThunk('doctorsSlice/Fetch_doctors',async()=>
{
    const res= await fetch('https://689c13a058a27b18087cd76d.mockapi.io/api/healthcare/Doctors')
    const data=await res.json();
    return data;
})
const doctorsSlice=createSlice({
    initialState:[],
    name:"doctorsSlice",
    reducers:{
        addDoctor:(state,action)=>
        {
            state.push(action.payload)
        },
        editDoctor:(state,action)=>
        {
             const index = state.findIndex((doc) => parseInt(doc.id) === parseInt(action.payload.id));
      if (index !== -1) {
        state[index] = action.payload; 
      }
        },
        deleteDoctor:(state,action)=>
        {
             state=state.filter((x)=>parseInt(x.id)!==parseInt(action.payload));
            return state;
        },

    },
    extraReducers:(builder)=>{
         builder.addCase(Fetch_doctors.fulfilled,(state,action)=>
        {
            // console.log("pay",action.payload);
            state=action.payload;
            return state
        })
    }
})
export const {addDoctor,deleteDoctor,editDoctor}=doctorsSlice.actions;
export default doctorsSlice.reducer