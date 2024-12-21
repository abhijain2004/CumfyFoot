import { useSelector, useDispatch } from "react-redux";
import { Select, Option, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { VscHeartFilled } from "react-icons/vsc";
import { CiHeart } from "react-icons/ci";
import useFetchProductData from "../hooks/FetchProduct";
import axios from "axios";
import { NavAction } from "../store/NavSlice";

function ItemSpecification() {
  const { idValue } = useSelector((state) => state.state);
  const dispatch = useDispatch();
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [amount, setAmount] = useState("1");
  const [wishlist,setWish]=useState([]);
  const navigate = useNavigate();
  const list = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const baseUrl = import.meta.env.VITE_API_URL;
  const url=`${baseUrl}/item/${idValue}`;


  const handleFilled = async(id) => {
    const response = await axios.post(`${baseUrl}/wish`,{realId:id},{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data);
    window.location.reload(); 
  };

  const handleEmpty = async (id) => {
    const response = await axios.delete(`${baseUrl}/wish/${id}`,{
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
      const response = await axios.get(`${baseUrl}/wish`,{
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


  const handleButton = async(value) => {
    const obj = {realId:value,size:size,color:color,amount:amount };
   const response = await axios.post(`${baseUrl}/cart`, obj,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
    console.log(response.data);
    navigate("/");
  };

  const { arr, loading } = useFetchProductData(idValue,url);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>; // Show loading spinner or message
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-col md:flex-row justify-evenly">
        <div className="h-[600px] md:h-screen p-4 md:p-12">
          <img className="object-cover h-full w-full" src={arr.img} alt={arr.name} />
        </div>
        <div className="content-center md:w-1/3 mx-4 md:mx-12">
          <h6 className="text-center text-lg md:text-xl lg:text-2xl font-bold">{arr.name}</h6>
          <div className="mt-4 text-sm md:text-base font-inter">{arr.text}</div>

          <div className="mt-8">
            {arr.type !== "Bags" && (
              <Select value={size} onChange={(val) => setSize(val)} variant="static" label="Pick a size">
                {arr["size"].map((item) => (
                  <Option value={item} key={item}>{item}</Option>
                ))}
              </Select>
            )}

            <div className="mt-8">
              <Select value={color} onChange={(val) => setColor(val)} variant="static" label="Pick a color">
                {arr["color"].map((item) => (
                  <Option value={item} key={item}>{item}</Option>
                ))}
              </Select>
            </div>

            <div className="mt-8">
              <Select value={amount} onChange={(val) => setAmount(val)} variant="static" label="Quantity">
                {list.map((item) => (
                  <Option value={item} key={item}>{item}</Option>
                ))}
              </Select>
            </div>

            <div className="mt-6 flex justify-center items-center">
              <Button onClick={() => handleButton(arr._id)} variant="outlined">
                ADD TO CART
              </Button>
              {wishlist.find((item) => item.id === arr._id) ? (
                <VscHeartFilled className="text-5xl cursor-pointer ml-4" onClick={() => handleEmpty(arr._id)} />
              ) : (
                <CiHeart className="text-5xl cursor-pointer ml-4" onClick={() => handleFilled(arr._id)} />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ItemSpecification;
