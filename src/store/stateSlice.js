import {createSlice} from "@reduxjs/toolkit"

const stateSlice=createSlice({
  name:"state",
  initialState:{
    value:"",
    idValue:"",
    title:""
  },
  reducers:{
    getValue:(state,action)=>{
      state.value=action.payload;
    },
    getId:(state,action)=>{
      state.idValue=action.payload;
    },
    byTitle:(state,action)=>{
      console.log(action.payload);
      state.title=action.payload;
    }

   
  }
})

export const stateAction=stateSlice.actions;
export default stateSlice;