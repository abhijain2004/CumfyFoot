import React, { useEffect } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Switch } from "@material-tailwind/react";  
import { useDispatch } from "react-redux";
import { drawerSliceAction } from "../store/drawerSlice";
import { useSelector } from "react-redux";

function DrawerColor({array,setArr,setSortOption,originalArr}) {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const dispatch=useDispatch();

const {colors}=useSelector((state)=>state.filter);
const {filterColor}=useSelector((state)=>state.filter);

const a = new Array(9).fill(0);
const [checked, setChecked] = React.useState(a);
const handleSwitch=(value)=>{
  let arr1=checked;
  if(arr1[value-1]===0){
    arr1[value-1]=1;
  }
  else if(arr1[value-1]===1){
    arr1[value-1]=0;
  }
  setChecked(arr1);
  
  dispatch(drawerSliceAction.colorFilter(checked));
  
  
}
useEffect(()=>{
  filterByColor(filterColor);
},[filterColor]);

const filterByColor=(filterColor)=>{ 
  
  
  const filtered = array.filter(item => 
    item.color.some(itemColor => filterColor.includes(itemColor))
  );

  if(filterColor.length===0){
    setArr(originalArr);
    setSortOption("Recommended");
  }else{
    setArr(filtered);
  }
  
  
  
}

 
  return (
    <React.Fragment>
      <Button onClick={openDrawer} color="red" className="mr-4 ">Color</Button>
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Color
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <Typography color="gray" className="mb-8 pr-4 font-normal flex flex-col gap-3 ">
          {colors.map((item)=>(
            <div className="flex gap-2 items-center ">
            <Switch
      id={item.id}
      ripple={false}
      className="h-full w-full checked:bg-[#2ec946]"
      containerProps={{
        className: "w-11 h-6",
      }}
      onClick={()=>handleSwitch(item.id)}
      circleProps={{
        className: "before:hidden left-0.5 border-none",
      }}/>
            <span>{item.color.toUpperCase()}</span>
            </div>
          ))}
        </Typography>
        
      </Drawer>
    </React.Fragment>
  );
}

export default DrawerColor;