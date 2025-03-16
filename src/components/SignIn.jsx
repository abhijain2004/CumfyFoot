import React, { useRef } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

 
function SignIn() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const navigate=useNavigate(); 
  const url = import.meta.env.VITE_API_URL;
  
  const emailElement=useRef();
  const passElement=useRef();
  const [rememberMe, setRememberMe] = useState(false);
  const handleCheckboxChange = () => {
    setRememberMe((prev) => !prev); // Toggle checkbox state
  };

  const handleAccount=()=>{
    setOpen(false);
    navigate("/signup");
  }
  const handleCross=()=>{
    setOpen(false);
  }

  const handlePage= async (evt)=>{
    evt.preventDefault();
    try {
      const formData={
        email:emailElement.current.value,
        password:passElement.current.value
      }
      
      // Replace with your backend URL
      const response = await axios.post(`${url}/login`, formData);
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
      setOpen(false);
    } catch (error) {
      alert('Account not found!');
    }
    window.location.reload();//reload page
  }

 
  return (
    <>
    <CgProfile onClick={handleOpen} className="text-6xl cursor-pointer"/>
    
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <form onSubmit={handlePage}>
        <Card className="mx-auto w-full max-w-[24rem]">
        <svg xmlns="http://www.w3.org/2000/svg" onClick={handleCross} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-8 cursor-pointer absolute top-3 right-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Sign In
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter your email and password to Sign In.
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Your Email
            </Typography>
            <Input  inputRef={emailElement} label="Email" size="lg" />
            <Typography className="-mb-2" variant="h6">
              Your Password
            </Typography>
            <Input inputRef={passElement} label="Password" type="password" size="lg" />
            
          </CardBody>
          
          
          <CardFooter className="pt-0">
          <Button variant="gradient" type="submit" fullWidth>
              Sign In
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={handleAccount}
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
        </form>
        
      </Dialog>
    
    </>
  );
}

export default SignIn;