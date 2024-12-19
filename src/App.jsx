import NavBar from "./components/NavBar";
import Slider from "./components/Slider";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import BottomSlider from "./components/BottomSlider";
import Feedback from "./components/Feedback";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { NavAction } from "./store/NavSlice";
import { useSelector } from "react-redux";
import SignUp from "./components/SignUp";

function App() {

  const dispatch = useDispatch();

  const checkAuth = async () => {
    
    try {
      const response = await axios.get("http://localhost:8080/validate", {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
      });
      if (response.data.isAuth) {
        dispatch(NavAction.authentication({isAuth:response.data.isAuth,email:response.data.email}));
      }
    } catch (error) {
      dispatch(NavAction.authentication({isAuth:false,email:""}));
    }
  };

  useEffect(() => {
    checkAuth(); // Call the async function directly
  }, []); // Empty dependency array to run only once on mount

  const {isAuth}=useSelector((state)=>state.nav);

  return (
    <>
        
        {isAuth && <>
        <NavBar />
        <Slider />
        <Categories />
        <Feedback />
        <BottomSlider />
        <Footer />
        </>}
       
        {!isAuth && <SignUp />}
    </>
    
  );
}

export default App;
