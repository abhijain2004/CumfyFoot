import NavBar from "./NavBar";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import { NavAction } from "../store/NavSlice";

function SearchScreen(){

  const dispatch=useDispatch();
  const {searchItem}=useSelector((state)=>state.search);

return <>
  <NavBar></NavBar>
  {searchItem.length===0?<div className="flex justify-center items-center h-[60vh]">No results found</div>:null}
  <div className="mx-auto flex justify-center">
<div className="grid  section:grid-cols-4 laptop:grid-cols-3 md:grid-cols-2 md:ml-8 gap-2 justify-center w-fit">
{searchItem.map((product)=>{
  return (
  <Link to={"/Cumfy/"+product.title+"/"+product.id}>
    <div key={product.id} onClick={()=>dispatch(NavAction.selectItem(product.id))}>
  <ProductCard product={product} ></ProductCard>
  </div>
  </Link>)
})}

</div>
</div>
  <Footer></Footer>
</>
}

export default SearchScreen;