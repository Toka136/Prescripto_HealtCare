import { createSlice } from "@reduxjs/toolkit";

const User_slice=createSlice(
    {
        initialState:[],
        name:"User_slice",
        reducers:{
            adduser:(state,action)=>
            {
                state.push(action.payload);
            },
            edituser:(state,action)=>
            {
                state=state.filter((x)=>parseInt(x.id)!==parseInt(action.payload.id));
                state.push(action.payload);
                return state
            },
            deleteuser:(state,action)=>
            {
                state=state.filter((x)=>x.id!==action.payload);
                return state;
            },
        }
    }
)
export const{adduser,deleteuser,edituser}=User_slice.actions;
export default User_slice.reducer;