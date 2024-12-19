import {itemsList} from "../assets/data/dummyData"
import clothes from "../assets/images/clothes.jpg"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import stateSlice, { stateAction } from "../store/stateSlice";

function Categories(){
  
  const dispatch=useDispatch();
  
 return <div className="mt-8">
  <h2 className="font-sans font-bold text-center text-3xl text-orange-700">SHOP BY CATEGORY</h2>
 <div className="grid md:grid-rows-3 grid-flow-col lg:grid-rows-2 grid-rows-4 gap-4 p-8 h-fit w-fit mx-auto">
  {itemsList.map((item)=>(
    <Link key={item} to={"/filteredProducts/"+item.type}>
    <div className=" mt-2 mb-8 border-2 rounded h-fit w-48 hover:scale-110 cursor-pointer  border-gray-400 transition-all relative" onClick={()=>dispatch(stateAction.getValue(item.type))} >
      <img src={item.image} className=" rounded  object-fil shadow-lg h-64 w-48 " />
      <div className="absolute bottom-5 bg-red-600 px-2 text-center">{item.type}</div>
    </div>
    </Link>
  ))}
 </div>
 <div className="bg-green-400 p-2 w-[60%] mx-auto rounded-md">
        <h3 className="text-red-600 text-center text-lg font-inter font-bold tracking-normal leading-none ">
          SALES UP TO 50%
        </h3>
      </div>
      <div>
        <img src={clothes} className="h-[500px] w-[70%] mx-auto rounded-lg mt-2 mb-2 "/>
      </div>
 </div>
}

export default Categories;