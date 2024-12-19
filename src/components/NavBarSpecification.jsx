import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavAction } from "../store/NavSlice";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import DrawerColor from "./Drawer";
import NavBar from "./NavBar";
import Footer from "./Footer";
import SortDropdown from "./SortDropdown";
import axios from "axios";
import { stateAction } from "../store/stateSlice";
import { useNavigate } from "react-router-dom";

function NavBarSpecification() {
  const dispatch = useDispatch();
  const { title } = useSelector((state) => state.state);
  const navigate=useNavigate();
  const [sortOption, setSortOption] = useState("Recommended");
  const [arr, setArr] = useState([]);
  const [originalArr, setOriginalArr] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state

  const sortedItem = (value) => {
    const a3 = JSON.parse(localStorage.getItem("navBar"))|| originalArr;
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

  const filteredProducts = async () => {
    setLoading(true);  // Set loading to true before the request
    try {
      const response = await axios.get(`http://localhost:8080/cumfy/${title}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      console.log(data);
      localStorage.setItem("navBar", JSON.stringify(data));
      setArr(data);
      setOriginalArr(data); // Store the original array
    } catch (error) {
      console.error("Error fetching products:", error);
      dispatch(NavAction.authentication({isAuth:false}));
      navigate("/");
    } finally {
      setLoading(false);  // Set loading to false after the request is complete
    }
  };

  useEffect(() => {
    filteredProducts();
  }, [title]);

  return (
    <>
      <NavBar />
      <div>
        <div className="mt-4 flex justify-end">
          <DrawerColor array={arr} setArr={setArr} setSortOption={setSortOption} originalArr={originalArr} />
          <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
        </div>
      </div>

      <div className="flex justify-center">
        {loading ? ( // Show a loading spinner or placeholder while loading
          <div className="flex justify-center items-center h-96">
            <div></div> 
            Loading Products...
          </div>
        ) : (
          <div className="grid section:grid-cols-4 laptop:grid-cols-3 md:grid-cols-2 md:ml-8 gap-2 justify-center w-fit">
            {arr.map((product) => (
              <Link to={"/Cumfy/" + product.title + "/" + product._id} key={product._id}>
                <div onClick={() => dispatch(stateAction.getId(product._id))}>
                  <ProductCard product={product} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default NavBarSpecification;
