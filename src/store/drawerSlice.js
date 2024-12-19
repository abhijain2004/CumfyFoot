import { createSlice } from "@reduxjs/toolkit";

const drawerSlice=createSlice({
  name:"filter",
  initialState:{
    filterColor:[],
    colors :[{id:"1",color:"black"}, {id:"2",color:"gray"}, {id:"3",color:"green"},{id:"4",color:"red"},{id:"5",color:"blue"} ,{id:"6",color:"brown"},{id:"7",color:"yellow"},{id:"8",color:"purple"},{id:"9",color:"orange"}]
  },
  reducers:{
    colorFilter: (state, action) => {
      
      let arr=[];
      for(let i=0;i<action.payload.length;i++){
        if(action.payload[i]===1){
          arr.push(state.colors[i].color);  
      }
      }
      state.filterColor=arr;
      
}
  }
})

export default drawerSlice;
export const drawerSliceAction=drawerSlice.actions;
