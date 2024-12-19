import {createSlice} from "@reduxjs/toolkit"

const sliderSlice=createSlice({
  name:"slider",
  initialState:{
   val:0,
  },
  reducers:{
   increment:(state)=>{
    if(state.val<=2){
      state.val++;
    } else {
     state.val=0;
    }
     
   },
   decrement:(state)=>{
    if(state.val>0){
      state.val--;
    } else {
     state.val=2;
    }
   },
   swiper:(state,action)=>{
   state.val=action.payload;
   }
  }
})

export const sliderAction=sliderSlice.actions;
export default sliderSlice;