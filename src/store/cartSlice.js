import {createSlice} from "@reduxjs/toolkit";

const cartSlice=createSlice({
  name:"cart",
  initialState:{
    buyItems:[],
    wishlist:[],
  },
  reducers:{
    addToCart:(state,action)=>{
      
      const arr=state.buyItems;
      state.buyItems=[action.payload,...arr];
    },
    deleteCart:(state,action)=>{
      const arr=state.buyItems.filter((item)=>item.id !== action.payload);
      state.buyItems=arr;
    },
    addWish:(state,action)=>{
     
      state.wishlist = Array.isArray(state.wishlist) ? state.wishlist : [];

      const itemExists = state.wishlist.some((item) => item._id === action.payload._id);

      // Add the item only if it doesn't already exist
      if (!itemExists) {
        state.wishlist = [action.payload, ...state.wishlist];
      }
    
      
    },
    deleteWish:(state,action)=>{
      
      
      state.wishlist = Array.isArray(state.wishlist) ? state.wishlist : [];

      state.wishlist = state.wishlist.filter((item) => item._id !== action.payload);
  }
}

})

export default cartSlice;
export const cartSliceAction=cartSlice.actions;