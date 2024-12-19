import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { CiHeart } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NavAction } from "../store/NavSlice";
import axios from "axios";
function WishList() {

  const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(!open);
const navigate=useNavigate();
const dispatch=useDispatch();
const [wishlist,setWish]=useState([]);
const handleCross=()=>{
  setOpen(false);
  }

 
  const wishProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/wish",{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      setWish(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

useEffect(()=>{
  wishProducts();
},[]);






  const {isAuth}=useSelector((state)=>state.nav);
  const handleBuy=(obj)=>{
    navigate(`/Cumfy/${obj.title}/${obj.id}`);
    setOpen(false);
  }
 
  return (
    <>
      <CiHeart className="text-7xl cursor-pointer"  onClick={() => handleOpen("lg")}/>
        {isAuth &&
      <Dialog
        open={open}
          
        size={"md"}
        handler={handleOpen}
      >
        <DialogHeader className="flex border-b-2">Favourites
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" onClick={handleCross} className="size-8 cursor-pointer absolute right-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg> 
        </DialogHeader>
        <DialogBody className="grid grid-cols-3 gap-4 justify-center">
         {wishlist.map((item)=>(
          <div><img src={item.img}className="h-52 rounded-lg border-2"></img>
          <Button className="mt-2 mx-3" color="red" onClick={()=>handleBuy(item)} variant="filled">BUY THIS</Button>
          </div>))} 
        </DialogBody>
      </Dialog>
}
    </>
  );
}


export default WishList;