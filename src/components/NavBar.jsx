import logo from "../assets/logo.png";
import { Input } from "@material-tailwind/react";
import { CiSearch } from "react-icons/ci";
import Cart from "./Cart";
import { NavAction } from "../store/NavSlice";
import { useDispatch, useSelector } from "react-redux";
import SignIn from "./SignIn";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import WishList from "./WishList";
import { useRef } from "react";
import { searchSliceAction } from "../store/searchSlice";
import { useNavigate } from "react-router-dom";
import { MenuDefault } from "./Menu";
import { stateAction } from "../store/stateSlice";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Store the query
  const searchTimeout = useRef(null);// Reference to store timeout
  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);

    // Clear previous timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Set a new timeout
    searchTimeout.current = setTimeout(() => {
      dispatch(searchSliceAction.findValue(event.target.value));
    }, 500); 
  };
  const handleSearch = () => {
    navigate("/searchedItem");
  };

  const { isAuth, email } = useSelector((state) => state.nav);

  return (
    <>
      {isAuth && (
        <>
          <nav className="md:pl-4 h-20 font-sans font-semibold border-b-2 shadow-lg flex items-center justify-between sticky top-0 z-40 bg-white min-w-[440px] ">
            <div className="flex gap-6 items-center ">
              <img src={logo} className="h-20" />
              <ul
                typeof="none"
                className="laptop:flex gap-4  items-center hidden "
              >
                <a href="/" className="hover:underline underline-offset-4">
                  HOME
                </a>
                <a
                  href="/Cumfy/Men"
                  className="hover:underline underline-offset-4"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(stateAction.byTitle("Men"));
                    navigate("/Cumfy/Men");
                  }}
                >
                  MEN
                </a>
                <a
                  href="/Cumfy/Women"
                  className="hover:underline underline-offset-4"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(stateAction.byTitle("Women"));
                    navigate("/Cumfy/Women");
                  }}
                >
                  WOMEN
                </a>
                <a
                  href="/Cumfy/Bag"
                  className="hover:underline underline-offset-4"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(stateAction.byTitle("Bag"));
                    navigate("/Cumfy/Bag");
                  }}
                >
                  BAGS
                </a>
                <a
                  href="/Cumfy/Home & Living"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(stateAction.byTitle("Home & Living"));
                    navigate("/Cumfy/Home & Living");
                  }}
                  className="hover:underline underline-offset-4"
                >
                  LIVING
                </a>
                <a
                  href="/Cumfy/Shoe"
                  className="hover:underline underline-offset-4"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(stateAction.byTitle("Shoe"));
                    navigate("/Cumfy/Shoe");
                  }}
                >
                  SHOES
                </a>
              </ul>
            </div>
            <div className="flex md:gap-5 items-center mr-8 gap-3">
              <Input
                type="text"
                placeholder="Search For Products"
                value={searchQuery}
                onClick={handleSearch}
                onChange={handleChange}
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
                icon={<CiSearch className="w-4 cursor-pointer" />}
                containerProps={{ className: "min-w-[140px]" }}
                autoFocus
              />

              <WishList></WishList>
              <Cart></Cart>
              {isAuth ? <MenuDefault email={email} /> : <SignIn />}

              <button
                className="cursor-pointer laptop:hidden"
                onClick={toggleNavbar}
              >
                {mobileDrawerOpen ? <X /> : <Menu />}
              </button>
            </div>
          </nav>
          {mobileDrawerOpen && (
            <div className=" sticky top-16 z-50  laptop:hidden bg-white border-2 shadow-lg  ">
              <ul
                typeof="none"
                className=" mt-2 flex flex-col items-center gap-3  "
              >
                <a href="/" className="hover:underline underline-offset-4">
                  HOME
                </a>
                <a
                  href="/Cumfy/Men"
                  className="hover:underline underline-offset-4"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(stateAction.byTitle("Men"));
                    navigate("/Cumfy/Men");
                    setMobileDrawerOpen(false);
                  }}
                >
                  MEN
                </a>
                <a
                  href="/Cumfy/Women"
                  className="hover:underline underline-offset-4"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(stateAction.byTitle("Women"));
                    navigate("/Cumfy/Women");
                    setMobileDrawerOpen(false);
                  }}
                >
                  WOMEN
                </a>
                <a
                  href="/Cumfy/Bag"
                  className="hover:underline underline-offset-4"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(stateAction.byTitle("Bag"));
                    navigate("/Cumfy/Bag");
                    setMobileDrawerOpen(false);
                  }}
                >
                  BAGS
                </a>
                <a
                  href="/Cumfy/Home & Living"
                  className="hover:underline underline-offset-4 "
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(stateAction.byTitle("Home & Living"));
                    navigate("/Cumfy/Home & Living");
                    setMobileDrawerOpen(false);
                  }}
                >
                  HOME & LIVING
                </a>
                <a
                  href="/Cumfy/Shoe"
                  className="hover:underline underline-offset-4"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(stateAction.byTitle("Shoe"));
                    navigate("/Cumfy/Shoe");
                    setMobileDrawerOpen(false);
                  }}
                >
                  SHOES
                </a>
              </ul>
            </div>
          )}
        </>
      )}

      {!isAuth && (
        <>
          <nav className="md:pl-4 h-20 font-sans font-semibold border-b-2 shadow-lg flex items-center justify-between sticky top-0 z-40 bg-white min-w-[440px] ">
            <div className="flex gap-6 items-center ">
              <img src={logo} className="h-20" />
              <ul
                typeof="none"
                className="laptop:flex gap-4  items-center hidden "
              >
                <a className="hover:underline underline-offset-4">HOME</a>
                <a className="hover:underline underline-offset-4">MEN</a>
                <a className="hover:underline underline-offset-4">WOMEN</a>
                <a className="hover:underline underline-offset-4">BAGS</a>
                <a className="hover:underline underline-offset-4">LIVING</a>
                <a className="hover:underline underline-offset-4">SHOES</a>
              </ul>
            </div>
            <div className="flex md:gap-5 items-center mr-8 gap-2">
              <Input
                type="text"
                placeholder="Search For Products"
                onClick={() => alert("Please Login First")}
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
                icon={<CiSearch className="w-4 cursor-pointer" />}
                containerProps={{ className: "min-w-[140px]" }}
              />

              <WishList></WishList>
              <Cart></Cart>
              <SignIn />

              <button
                className="cursor-pointer laptop:hidden"
                onClick={toggleNavbar}
              >
                {mobileDrawerOpen ? <X /> : <Menu />}
              </button>
            </div>
          </nav>
          {mobileDrawerOpen && (
            <div className=" sticky top-16 z-50  laptop:hidden bg-white border-2 shadow-lg  ">
              <ul
                typeof="none"
                className=" mt-2 flex flex-col items-center gap-3  "
              >
                <a className="hover:underline underline-offset-4">HOME</a>
                <a className="hover:underline underline-offset-4">MEN</a>
                <a className="hover:underline underline-offset-4">WOMEN</a>
                <a className="hover:underline underline-offset-4">BAGS</a>
                <a className="hover:underline underline-offset-4 ">
                  HOME & LIVING
                </a>
                <a className="hover:underline underline-offset-4">SHOES</a>
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default NavBar;
