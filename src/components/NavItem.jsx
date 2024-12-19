import {useSelector,useDispatch} from "react-redux"
import { Select, Option,Button } from "@material-tailwind/react";
import { useParams } from "react-router";
import { cartSliceAction } from "../store/cartSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { VscHeartFilled } from "react-icons/vsc";
import { CiHeart } from "react-icons/ci";
import { NavAction } from "../store/NavSlice";
import useFetchProductData from "../hooks/FetchProduct";
import axios from "axios";
import { useEffect } from "react";

function ItemSpecification(){
  const { idValue } = useSelector((state) => state.state);
  
  const url=`http://localhost:8080/item/${idValue}`;
  const dispatch=useDispatch();
  const[size,setSize]=useState("");
  const[color,setColor]=useState("");
  const [wishlist,setWish]=useState([]);
  const navigate=useNavigate();
  const[amount,setAmount]=useState("1");
  const handleButton=async (value)=>{
    
    const obj = { realId:value,size:size,color:color,amount:amount };
    const response = await axios.post("http://localhost:8080/cart", obj,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
     console.log(response.data);
     navigate("/");
  }

  const { arr, loading } = useFetchProductData(idValue,url);
  

  const list=["1","2","3","4","5","6","7","8","9","10"];
  

  const handleFilled = async(id) => {
    const response = await axios.post("http://localhost:8080/wish",{realId:id},{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data);
    window.location.reload(); 
  };

  const handleEmpty = async (id) => {
    const response = await axios.delete(`http://localhost:8080/wish/${id}`,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data);
    window.location.reload();
  };


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




  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>; // Show loading spinner or message
  }

 return <>
 <NavBar></NavBar>
 <div className="flex flex-col md:flex-row justify-evenly">
 <div className="h-[600px] md:h-screen p-4 md:p-12">
   <img 
     className="object-cover h-full w-full" 
     src={arr.img} 
     alt={arr.name} 
   />
 </div>
 <div className="content-center md:w-1/3 mx-4 md:mx-12">
   <h6 className="text-center text-lg md:text-xl lg:text-2xl font-bold">{arr.name}</h6>
   <div className="mt-4 text-sm md:text-base  font-inter">
     {arr.text}
     {/*text-sm and text-base are used to set the font size of text elements. */ }
   </div >


   <div className="mt-8">
   {arr["title"] !=="Bag" && <Select value={size} onChange={(val)=>setSize(val)} variant="static" label="Pick a size">
        {arr["size"].map((item)=>(<Option value={item}>{item}</Option>))}
      </Select>}

    <div className="mt-8">
      <Select value={color} onChange={(val)=>setColor(val)} variant="static" label="Pick a color">
      {arr["color"].map((item)=>(<Option value={item}>{item}</Option>))}
      </Select>
      </div>
      <div className="mt-8">
      <Select value={amount} onChange={(val)=>setAmount(val)} variant="static" label="Quantity">
      {list.map((item)=>(<Option value={item}>{item}</Option>))}
      </Select>
      </div>
      <div className="mt-6 flex justify-center">
      <Button onClick={()=>handleButton(arr._id)} variant="outlined">ADD TO CART</Button>
      {wishlist.find((item)=>item.id===arr._id) ? <VscHeartFilled className="text-5xl cursor-pointer ml-4" onClick={()=>handleEmpty(arr._id)}/> :<CiHeart className="text-5xl cursor-pointer ml-4" onClick={()=>handleFilled(arr._id)}/>}
      </div>

      </div>
      

      
      


 </div>
</div>
<Footer></Footer>
</>
}

export default ItemSpecification;