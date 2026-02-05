import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name:'connections',
    initialState:null,
    reducers:{
        addConnections:(state, action) =>{
            return action.payload
        },
        removeConnection:() => null,//Agar ek line mein hi ho toh {} and return nhi likhna padta.         
    }
})

export const {addConnections, removeConnection} = connectionSlice.actions;
export default connectionSlice.reducer;