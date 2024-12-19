import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";





function ProductCard({product}){
 return <Card className="mt-10 w-80 rounded-xl shadow-xl" >
 <CardHeader color="blue-gray" className="relative h-80 ">
   <img className=" w-[100%] h-[100%] object-cover shadow-blue-900"
     src={product.img}
   />
 </CardHeader>
 <CardBody>
   <Typography variant="h5" color="blue-gray" className=" justify-center">
     {product.name}
   </Typography>
   <Typography>
     {product.text}
   </Typography>
 </CardBody>
 <CardFooter className="pt-0">
  <div className="border-t-2 border-solid h-6 mt-2 p-4 flex justify-between content-center">
   <div>{"$"+product.price}</div>
   <Typography variant="small" color="gray" className="flex gap-1">
            {product["color"].map((color, index) => {
              return (
                <i
                  className="fas fa-map-marker-alt fa-sm mt-[3px] rounded-full p-2 mr-4 "
                  key={index}
                  style={{ backgroundColor: color }}
                ></i>
              );
            })}
          </Typography>
          </div>
 </CardFooter>
</Card>
}

export default ProductCard;