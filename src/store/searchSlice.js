import { createSlice } from "@reduxjs/toolkit";
import { storeData } from "../assets/data/dummyData";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchItem: [],
  },
  reducers: {
    findValue: (state, action) => {
      const searchTerm = action.payload.toLowerCase().trim();

      
      const keywords = searchTerm.split(" ");
      let filtered = storeData.filter((product) => {
        const productName = product["name"].toLowerCase();
        return keywords.some((keyword) => productName.includes(keyword));
      });

      
      state.searchItem = filtered;
    },
  },
});

export default searchSlice;
export const searchSliceAction = searchSlice.actions;
