import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import NavBar from "./NavBar";
import Footer from "./Footer";
import SortDropdown from "./SortDropdown";
import DrawerColor from "./Drawer";
import axios from "axios";
import { stateAction } from "../store/stateSlice";
import { NavAction } from "../store/NavSlice";
import { useNavigate } from "react-router-dom";

function FilteredProducts() {
  const { value } = useSelector(state => state.state);
  const [arr, setArr] = useState([]); // Initially empty array
  const [originalArr, setOriginalArr] = useState([]); // Store the original fetched array separately
  const [loading, setLoading] = useState(true); // Add loading state
  const dispatch = useDispatch();
  const [sortOption, setSortOption] = useState("Recommended");
  const baseUrl= import.meta.env.VITE_API_URL;
  const url = `${baseUrl}/product/${value}`;
  const navigate = useNavigate();

  console.log(process.env.API_URL);
  const filteredProducts = async () => {
    setLoading(true); // 
    try {
      const response = await axios.get(url,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      console.log(data);
      localStorage.setItem("arr", JSON.stringify(data));
      setArr(data);
      setOriginalArr(data); // Store the original array
      setLoading(false); // Turn off loading after data is fetched
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false); // Even in case of error, stop loading
      dispatch(NavAction.authentication({isAuth:false}));
      navigate("/");
    }finally {
      setLoading(false);  // Set loading to false after the request is complete
     
    }
  };

  useEffect(() => {
    filteredProducts();
  }, [value]); 

  const sortedItem = (value) => {
    const a3 = JSON.parse(localStorage.getItem("arr"))|| originalArr;
    if (value === "Recommended") {
      setArr(a3);
    }
    else if (value === "Asc") {
      let a2 = [...arr].sort((a, b) => a.price - b.price);
      setArr(a2);
    } else if (value === "Desc") {
      let a1 = [...arr].sort((a, b) => b.price - a.price);
      setArr(a1);
    }
  };
  

  useEffect(() => {
   
      sortedItem(sortOption);
    
  }, [sortOption]); 

 

  return (
    <>
      <NavBar />
      <div className="mt-4 flex justify-end">
        <DrawerColor array={arr} setArr={setArr} setSortOption={setSortOption} originalArr={originalArr} />
        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
      </div>
      <div className="flex justify-center">
      {loading ? ( // Show a loading spinner or placeholder while loading
          <div className="flex justify-center items-center h-96">
            <div></div> 
            Loading Products...
          </div>
        ) : (
        <div className="grid section:grid-cols-4 laptop:grid-cols-3 md:grid-cols-2 md:ml-8 gap-2 justify-center w-fit">
          {arr.map((product) => {
            return (
              <Link to={"/filteredProducts/" + product.type + "/" + product._id} key={product._id}>
                <div onClick={() => dispatch(stateAction.getId(product._id))}>
                  <ProductCard product={product} />
                </div>
              </Link>
            );
          })}
        </div>)}
      </div>
      <Footer />
    </>
  );
}

export default FilteredProducts;
