import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NavAction } from "../store/NavSlice";

const useFetchProductData = ( idValue,url) => {
  const [arr, setArr] = useState(JSON.parse(localStorage.getItem("value")) || localStorage.getItem("value"));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setArr(response.data); // Set the fetched data
      localStorage.setItem("value", JSON.stringify(response.data)); // Save data to localStorage
      setLoading(false); // Turn off loading after fetching data
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false); // Stop loading on error
      dispatch(NavAction.authentication({ isAuth: false }));
      navigate("/"); // Redirect on error
    }
  };

  useEffect(() => {
    if (idValue) {
      fetchProducts();
    } else {
      const localData = localStorage.getItem("value");
      if (localData) {
        setArr(JSON.parse(localData));
        setLoading(false); // Use data from localStorage if available
      } else {
        console.error("No idValue and no data in localStorage");
        setLoading(false); // Stop loading if no idValue or local data
      }
    }
  }, [idValue]);

  return { arr, loading };
};

export default useFetchProductData;
