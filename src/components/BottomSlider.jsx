import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function BottomSlider() {
  return <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active ">
      <img src="https://i.pinimg.com/736x/b6/89/96/b68996b0aeb13339740f961ada455a77.jpg" className="d-block w-100 h-96" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxFIK8TfCMSClj3hMCVCVIArzHF2Y5-oKQnA&s" className="d-block w-100 h-96" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://img.freepik.com/premium-vector/online-shopping-online-store-smart-phone-app-with-0-interest-rate-banking-financial-installment-e-commerce-payment-retail-business-technology-delivery-service_251139-34.jpg?w=996" className="d-block w-100 h-96" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://images.moneycontrol.com/static-mcnews/2023/07/8-UPI-770x433.jpg?impolicy=website&width=770&height=431" className="d-block w-100 h-96" alt="..."/>
    </div>
  </div>
</div>
}

export default BottomSlider;