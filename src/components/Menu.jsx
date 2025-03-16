import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { Avatar} from "@material-tailwind/react";
import { FaChevronDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export function MenuDefault({email}) {
  const navigate=useNavigate();
  const handleButton=()=>{
    localStorage.clear();
    navigate("/");
    window.location.reload(); 
  }
   
  return (
    <Menu>
      <MenuHandler>
        <div className="flex items-center gap-4  w-44 p-1 rounded-lg border-2  ">
        <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
        <FaChevronDown className="text-xl cursor-pointer" />
      </div>
      </MenuHandler>
      <MenuList>
      <MenuItem className="text-center font-bold text-2xl mb-2">Profile</MenuItem>
      <MenuItem className="text-center"><Avatar src="https://docs.material-tailwind.com/img/face-2.jpg"  alt="avatar" size="xxl" /></MenuItem>
        <MenuItem >{email}</MenuItem>
        <Button className="w-full mt-4" onClick={handleButton}>Logout</Button>
      </MenuList>
    </Menu>
    
  );
}