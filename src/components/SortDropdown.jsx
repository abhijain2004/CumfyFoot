import React, { useEffect, useState } from "react";

function SortDropdown({sortOption,setSortOption}) {
 
 

  const handleChange = (event) => {
    setSortOption(event.target.value);
  };

 

  return (
    <div className="flex items-center border-1  mr-3">
      <label className="ml-2">Price :</label>
      <select
        value={sortOption}
        onChange={handleChange}
        className="p-[5px] cursor-pointer outline-0"
      >
        <option value="Recommended" >Recommended</option>
        <option value="Asc">Low to High</option>
        <option value="Desc">High to Low</option>
      </select>
    </div>
  );
}

export default SortDropdown;
