import easy from "../assets/images/easy.png"
import hand from "../assets/images/hand.png"
import assured from "../assets/images/assured.png"
import footImage from "../assets/images/footImage.png"

function Footer(){
  return <footer className="mt-4 border-t-2 border-neutral-700 min-w-[440px] ">
    <div className="flex justify-evenly  ">
      <img src={easy}  className="bg-white h-24"/>
      <img src={hand}  className="h-24"/>
      <img src={assured}  className="h-24"/>
    </div>
    <div className="bg-customColor  md:p-28 flex  flex-col text-xs">
    <div className=" flex justify-evenly text-gray-300  mt-6 lg:mt-0">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold font-sans text-blue-gray-300 mb-4 "> Cumfy Foot</h1>
        <a href="https://www.ajio.com/help/whoweare">Who We Are</a>
        <a href="">Join Our Team</a>
        <a href="">Terms & Conditions</a>
        <a href="">Fees &Payments</a>
        
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold font-sans text-blue-gray-300 mb-4">Help</h1>
        <a href="">Track Your order</a>
        <a href="">FAQ's</a>
        <a href="">Cancellations</a>
        <a href="">Customer Care</a>
        <a href="">Returns</a>
        <a href="">Refund Policy</a>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold font-sans text-blue-gray-300 mb-4">Follow us</h1>
        <a href="https://www.instagram.com/">Instagram</a>
        <a href="https://www.facebook.com/AJIOlife">Facebook</a>
        <a href="https://x.com/?lang=en">Twitter</a>
        <a href="https://www.linkedin.com/feed/">LinkedIn</a>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold font-sans text-blue-gray-300 mb-4">Shop By</h1>
        <a href="/Cumfy/Men">Men</a>
        <a href="/Cumfy/Women">Women</a>
        <a href="/Cumfy/Bag">Bags</a>
        <a href="/Cumfy/Home & Living">Home & Living</a>
        <a href="/Cumfy/Shoe">Shoes</a>
      </div>
      </div>
      <div className="border-t border-white flex flex-col mt-12">
         <p className="text-gray-300 font-sans text-center mt-4 mb-8">Copyright © 2022 Cumfy Foot. All rights reserved.</p>
         <div className="mx-auto"><img src={footImage} className="h-20 "/></div>
      </div>
    </div>
  </footer>
}

export default Footer;