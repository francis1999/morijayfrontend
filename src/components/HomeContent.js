import React from 'react';
import './HomeContent.css';
import CardItem from './CardItem';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function HomeContent() {
  const [cars, setCars]=useState([])
  const [loading, setLoading]=useState(true)
  const getToken = localStorage.getItem("token");
 
  useEffect(()=>{
    let mounted=true
    axios.get('https://morijaybackend.herokuapp.com/api/product/Getallcar').then((res)=>{
      console.log(res.data.data)
        if(mounted){
            if(res.data.status=="success"){
                setCars(res.data.data)
                setLoading(false)
                console.log(cars)
            }
            else if(res.data.status=="500"){
                new Swal("Warning", res.data.message,"error")
            }
        }
    })
   return()=>{
    mounted=false
   }
})

if(loading){
  return(
      <h3>Loading...</h3>
  )
}
else
{
 var showallcars=''
 showallcars=cars.map((car, index)=>{
  return (
      <div className="col-md-3" key={index} id="col-md-3">

          <div className="card" id='card'>
          <div className="card-body">
          <Link to={`singlecar/${car._id}`}> <img src={car.image} alt="" className='w-100'/></Link>
          <div className="card-text text-success mt-4 fw-bold">&#8358; {car.price}.</div>
              <div className="card-title fw-bold w-full">{car.productname}</div>
              <div id="cartbutton"> <Link to={`singlepage/${car._id}`}>View</Link></div>
              {/* <a href="#" className="cartbutton" id="cartbutton"> View</a> */}
          </div>
          </div>

      </div>

    // <div className='cards'>
      
    //   <span className='welcome'>
    //     Welcome to Morijay Building Materials Ltd! 
    //     We have proudly served home-owners and pro-contractors in Ibadan, Oyo State 
    //     and we are working towards serving South West States and entire Nigeria. 
    //     We succeed when everything we do is based on our mission and values. 
    //     We are a growing company with friendly stores where customers like to shop. 
    //   </span>
    //   <div className='cards__container'>
    //     <div className='cards__wrapper'>
    //       <ul className='cards__items'>
    //         <CardItem
    //           src='images/store1.jpg'
    //           text='Popo Junction, Akobo, Ibadan'
    //           label='Store One'
    //           path='/services'
    //         />
    //         <CardItem
    //           src='images/store2.jpg'
    //           text='C5, Abegbe Shopping Complex, Iyana-Church, Ibadan'
    //           label='Store Two '
    //           path='services'
    //         />
    //           <CardItem
    //           src='images/store3.jpg'
    //           text='Galilee Bus-Stop, Oki, Along Olodo, Ibadan '
    //           label='Store Three'
    //           path='/products'
    //         />
    //       </ul>
    //       <ul className='cards__items'>
    //         <CardItem
    //           src='images/Truck1.jpg'
    //           text='We have trucks for hire. Contact us for hire service'
    //           label='Hire Service'
    //           path='/Hire Service'
    //         />
          
    //         <CardItem
    //           src='images/Truck2.jpg'
    //           text='We have trucks for delivery'
    //           label='Delivery Service'
    //           path='/Delivery'
    //         />
    //       </ul>
    //     </div>
    //   </div>
    // </div>
  );
    //  return(
       
    //       <div className="col-md-3" key={index}>
              
    //               <div className="card">
    //               <div className="card-body">
    //              <Link to={`singlecar/${car._id}`}> <img src={`https://automartbackend.herokuapp.com/${car.image[0].filePath}`} alt="" className='w-100'/></Link>
    //               <div className="card-text text-success mt-4 fw-bold">&#8358; {car.price}.</div>
    //                   <div className="card-title fw-bold" >{car.modelname}-{car.year}</div>
    //                   <div className="card-text">{car.description}.</div>
    //                   <a href="#" className="cartbutton">{/* <img src={cart} alt="cart"/> Add to Cart */}</a>
    //               </div>
    //               </div>
              
    //       </div>
      
    //  )
 })
}

return (
  <div className='' id='mian-container'>
                    <div className='container h-2' id='main-div'>
                        <div className='row' id='main-row'>
                            {showallcars}
                        </div>
                    </div>
  </div>
)




  /* return (
    <div className='cards'>
      <span className='welcome'>
        Welcome to Morijay Building Materials Ltd! 
        We have proudly served home-owners and pro-contractors in Ibadan, Oyo State 
        and we are working towards serving South West States and entire Nigeria. 
        We succeed when everything we do is based on our mission and values. 
        We are a growing company with friendly stores where customers like to shop. 
      </span>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/store1.jpg'
              text='Popo Junction, Akobo, Ibadan'
              label='Store One'
              path='/services'
            />
            <CardItem
              src='images/store2.jpg'
              text='C5, Abegbe Shopping Complex, Iyana-Church, Ibadan'
              label='Store Two '
              path='services'
            />
              <CardItem
              src='images/store3.jpg'
              text='Galilee Bus-Stop, Oki, Along Olodo, Ibadan '
              label='Store Three'
              path='/products'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/Truck1.jpg'
              text='We have trucks for hire. Contact us for hire service'
              label='Hire Service'
              path='/Hire Service'
            />
          
            <CardItem
              src='images/Truck2.jpg'
              text='We have trucks for delivery'
              label='Delivery Service'
              path='/Delivery'
            />
          </ul>
        </div>
      </div>
    </div>
  ); */
}

export default HomeContent;
