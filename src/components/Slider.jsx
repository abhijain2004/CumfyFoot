import { sliderData } from "../assets/data/dummyData";
import {useDispatch, useSelector} from "react-redux";
import { sliderAction } from "../store/sliderSlice";
import { Badge} from "@material-tailwind/react";
import { useEffect } from "react";

function Slider(){
  const {val}=useSelector((store)=>store.slider);
  const data=sliderData.map((obj)=>(obj));
  const dispatch=useDispatch();
  const handleLeft=()=>{
    dispatch(sliderAction.decrement());
  }
  const handleRight=()=>{
    dispatch(sliderAction.increment());
  }
  const handleSwiper=(id)=>{
    dispatch(sliderAction.swiper(id));
  }

  
  useEffect(()=>{
    const intervalId=setInterval(()=>{
     handleRight();
    },4000);//every second me update

    return ()=>{
      clearInterval(intervalId);//Jab bhi dusri ui /page click ki ye value cancel ho jaayegi
    }
  },[]);

return <div className="slider mt-6">
      <div className="relative "><img src={data[val].img} className=" slider w-screen"/>
      <p className="text-white absolute top-32 left-0 right-0 text-center text-2xl font-bold font-inter">{data[val].text}</p>
      <div className="absolute cursor-pointer top-64 left-0 " onClick={handleLeft}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-10" >
  <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
       </svg></div>
       <div className="absolute  top-64 right-0 cursor-pointer"
       onClick={handleRight}>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-10">
  <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
</svg>
</div>

<div className="absolute bottom-8 right-1/2 left-1/2">
<div className="flex  gap-4 justify-center">
  {sliderData.map((obj)=>(val==obj.id?<Badge  color="green" className="cursor-pointer" onClick={()=>handleSwiper(obj.id)} key={obj.id}>
  </Badge>:<Badge className="cursor-pointer" color="white"onClick={()=>handleSwiper(obj.id)} key={obj.id}>
  </Badge>))}
</div>

</div>
      </div>   
</div>
}

export default Slider;