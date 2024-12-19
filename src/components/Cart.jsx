import React, { useEffect } from "react";
 import {
   Button,
   Dialog,
   DialogHeader,
   DialogBody,
   DialogFooter,
   Badge
 } from "@material-tailwind/react";
import { useState } from "react";
import {useSelector,useDispatch} from "react-redux";
import axios from "axios";

function Cart(){
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(!open);
const[buyItems,setBuyItems]=useState([]);


const {isAuth}=useSelector((state)=>state.nav);

const cartValue= async ()=>{
  try{
  const response=await axios.get("http://localhost:8080/cart",{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  console.log(response.data);
  
  setBuyItems(response.data);
  }catch(err){
    console.log(err);
    
  }
}

const handleDelete=async(id)=>{
  try{
  await axios.delete(`http://localhost:8080/cart/${id}`,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  cartValue();
  }catch(err){
    console.log(err);
  }
}


  useEffect(()=>{
    cartValue();
  },[]);


  const uniqueItems = new Map();
  buyItems.forEach((item) => {
    if (!uniqueItems.has(item.id)) {
      uniqueItems.set(item.id, item);
    }
  });
  const myset = Array.from(uniqueItems.values());

const handleCross=()=>{
  setOpen(false);
  }
   let count=0;
  const sum=()=>{
   for(let i=0;i<myset.length;i++){
     count=count+myset[i].price*myset[i].amount;
   }
   return count;
  }
  
   return (
     <>
       <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-14 cursor-pointer"
            onClick={handleOpen}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          {isAuth &&
       <Dialog open={open} handler={handleOpen}>
        <div className="border-b-2 h-14 ">
        <DialogHeader className="flex justify-between h-4 items-center ">
          <span className="mt-2">Shopping Bag</span>
        <div onClick={handleCross}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-8 cursor-pointer">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        </div>
         



        </DialogHeader>
        </div>
         <DialogBody className="flex flex-col h-[30rem] overflow-y-auto ">
           {myset.map((item)=>{
             
           return <div className=" flex mb-6 p-4">
              <div className="w-[50%]">

              <div>
                <img src={item.img} className="h-40 w-40" />
              </div>

              <div className="mt-4">
                <h1 className="font-bold text-black">{item.name}</h1>
                <div className="w-[90%]">{item.text}</div>
              </div>

              </div>


              <div className="p-4">
                {item.type !=="Bags" && <div>Selected Size: {item.size}</div>}
                <div >Selected Color: <span
                    className="h-3 w-3 rounded-full inline-block"
                    style={{ backgroundColor: item.color }}
                  ></span></div>
                <div>Amount:{item.amount}</div>
                <div>Single Item Price: ${item.price}</div>
                <div>Total Item Prices:${item.amount*item.price}</div>
                <Button className="mt-4" onClick={()=>handleDelete(item.id)} color="red"variant="filled">Delete</Button>
              </div>
            </div>
})}
         </DialogBody>
         <DialogFooter className="border-t-2">
          Total Amount:{ "$"+sum()}
           </DialogFooter>
       </Dialog>
}
     </>
   );
 }


export default Cart;