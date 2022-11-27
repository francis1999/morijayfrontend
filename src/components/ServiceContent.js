import React from 'react';
import './ServiceContent.css';
import CardItem from './CardItem';

function ServiceContent() {
    return (
      <div className='cards'>
        <p className='welcome'>
        At Morijay Building Materials Ltd, we offer a wide array of top quality and competitively priced building materials 
        to meet your private and commercial needs. Backed by our technological infrastructure and experienced team, we 
        guarantee consistency in the provision of building materials when it is needed and where it is needed. 
        <br/>
        We have a wide array of products for interior and exteriors including roofing, ceilings, doors, tools, gum and glass products, etc.
        Our extensive product are from local and foreign brands.
        </p>
        <div className='cards__container'>
          <div className='cards__wrapper'>
            <ul className='cards__items'>
              <CardItem
                src='images/Store1.jpg'
                text='We sell Wholesales and Retail'
                label='Wholesales and Retail'
                path='/Services'
              />
            <div>
              <p >The two main ways we sell our products is either as a wholesaler or as a retailer.<br/>
                 We sell in large and small quatity in our stores. <br/>
                 We buy from the manufactures and sell goods to the retailers.<br/>
                 We buy in bulk quantities from the manufacturers and sell in small quantities to the retailers.<br/>
                 We sell at discounted price</p>
            </div>
            </ul>
        
            <ul className='cards__items'>
              <CardItem
                src='images/Truck2.jpg'
                text='We have trucks for delivery of goods and hire service'
                label='Delivery and Hire Service'
                path='/Hire Service'
              />
              <p>We render delivery service to our esteemed customers. <br/>
              We also render hire service to anyone that wishes to hire our trucks to move things <br/>from one location to another.</p>
            </ul>
            
          </div>
        </div>
      </div>
    );
  }
  
  export default ServiceContent;
  