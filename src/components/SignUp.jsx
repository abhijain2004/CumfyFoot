import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import logo from '../assets/logo.png';
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useRef } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SignIn from "./SignIn";

const SignUp = () => {
  
  const emailElement=useRef();
  const passElement=useRef();
  const url = import.meta.env.VITE_API_URL;
  const navigate=useNavigate();

  const onSubmit= async (event)=>{
    event.preventDefault();
    
    try {
      const formData={
        email:emailElement.current.value,
        password:passElement.current.value
      }
      // Replace with your backend URL
      const response = await axios.post(`${url}/signup `, formData);
      console.log('Response from server:', response.data);
      alert('Account created successfully!');
    } catch (error) {
      alert('Failed to create account.');
    }
    emailElement.current.value="";
    passElement.current.value="";
    navigate("/");
  }

  return <>
  <NavBar></NavBar>
      <form onSubmit={onSubmit}>
      <Card className="mx-auto min-w-[330px] w-[50%] mt-8 border-t-2 mb-8">
      <div className="mx-auto">
        <img src={logo} className='h-48' />
      </div>
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray" className="text-center">
              Sign Up
            </Typography>
            <Typography
              className="mb-3 font-normal text-center"
              variant="paragraph"
              color="gray"
            >
              Enter your email and password to Create Account.
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Your Email
            </Typography>
            <Input inputRef={emailElement} label="Email" size="lg" />
            <Typography className="-mb-2" variant="h6">
              Your Password
            </Typography>
            <Input inputRef={passElement} label="Password" type="password" size="lg" />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" type="submit" fullWidth>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
                          Already have an account?
                          <Typography
                           
                            variant="small"
                            color="blue-gray"
                            className="ml-1 font-bold"
                          >
                            Click on Profile button to SignIn
              </Typography>
              </Typography>
          </CardFooter>
        </Card>
        </form>
        <Footer></Footer>
        </>
  
};

export default SignUp;