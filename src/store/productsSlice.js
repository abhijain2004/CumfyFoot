import {createSlice} from "@reduxjs/toolkit"
import { storeData } from "../assets/data/dummyData";



const productsSlice=createSlice({
  name:"products",
  initialState:{
    filteredProducts:JSON.parse(sessionStorage.getItem("filteredData")) || storeData, //if value is null then it return storeData
    oneItem:JSON.parse(sessionStorage.getItem("oneItem")) ,
  },
  reducers:{
    filterProducts(state,action){
    
     const filter=storeData.filter((product)=>product.type===action.payload);
     state.filteredProducts=filter;
     const saveState=JSON.stringify(filter);//convert javascript object to json
     sessionStorage.setItem("filteredData",saveState
     );
    
    },
    oneProduct(state,action){
      console.log(action.payload);
      
      const a=state.filteredProducts
      console.log(state.filteredProducts);
      
      if(action.payload>=a[0].id && action.payload<=a[a.length-1].id ){
        console.log("Hello");
        
      const filter=state.filteredProducts.filter((product)=>product.id===action.payload);
      state.oneItem=filter;
      const saveState=JSON.stringify(filter);//convert javascript object to json
     sessionStorage.setItem("oneItem",saveState);
    }
    else{
      return ;
    }
  },
}
});

export const productsSliceActions=productsSlice.actions;
export default productsSlice;