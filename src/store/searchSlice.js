import { createSlice } from "@reduxjs/toolkit";


const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchItem: [],
    storeData:[],
  },
  reducers: {
    setValue: (state, action) => {
      state.storeData = action.payload;
      state.searchItem=state.storeData;
    },
    findValue: (state, action) => {
      const searchTerm = action.payload.toLowerCase().trim();
      //The .trim() method in JavaScript removes whitespace characters (spaces, tabs, newlines) from both the beginning and end of a string.
      
      let filtered = state.storeData.filter((product) => {
        const productName = product["type"].toLowerCase();
        
        
        return productName.includes(searchTerm);
      });
      
      state.searchItem = filtered;
    },
  },
});

export default searchSlice;
export const searchSliceAction = searchSlice.actions;
