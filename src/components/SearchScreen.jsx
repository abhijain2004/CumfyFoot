import NavBar from "./NavBar";
import Footer from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useEffect } from "react";
import axios from "axios";
import { searchSliceAction } from "../store/searchSlice";
import { NavAction } from "../store/NavSlice";

function SearchScreen() {
  const url = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const { searchItem } = useSelector((state) => state.search);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${url}/products`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(searchSliceAction.setValue(response.data));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  
  
  return (
    <>
      <NavBar />
      {searchItem.length === 0 ? (
        <div className="flex justify-center items-center h-[60vh]">
          No results found
        </div>
      ):
      <div className="mx-auto flex justify-center">
        <div className="grid section:grid-cols-4 laptop:grid-cols-3 md:grid-cols-2 md:ml-8 gap-2 justify-center w-fit">
          {searchItem.map((product) => (
            <Link key={product.id} to={`/Cumfy/${product.title}/${product.id}`}>
              <div onClick={() => dispatch(NavAction.selectItem(product.id))}>
                <ProductCard product={product} />
              </div>
            </Link>
          ))}
        </div>
      </div>}
      <Footer />
    </>
  );
}

export default SearchScreen;
