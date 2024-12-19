import {createSlice} from "@reduxjs/toolkit"
import { storeData } from "../assets/data/dummyData";

const NavSlice=createSlice({
  name:"nav",
  initialState:{
    selectedNav:JSON.parse(sessionStorage.getItem("selectedNav")) || storeData,
    navItem:JSON.parse(sessionStorage.getItem("navItem")),
    isAuth:false,
    email:""
  },
  reducers:{
    initialise:(state,action)=>{
      const filter=storeData.filter((product)=>product.title===action.payload);
      state.selectedNav=filter;
      const saveState=JSON.stringify(filter);//convert javascript object to json
      sessionStorage.setItem("selectedNav",saveState);
      
    },
    selectItem:(state,action)=>{
      const filter=storeData.filter((product)=>product.id===action.payload);
      state.navItem=filter;
      const saveState=JSON.stringify(filter);//convert javascript object to json
      sessionStorage.setItem("navItem",saveState);
    },
    authentication:(state,action)=>{
      state.isAuth=action.payload.isAuth;
      state.email=action.payload.email;
    }
   
  }
})

export const NavAction=NavSlice.actions;
export default NavSlice;