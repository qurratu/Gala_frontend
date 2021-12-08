import React ,{ useState} from 'react'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faSmile ,faSearch} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import ReactPaginate from "react-paginate";
import { Col,Row,Card,Button } from 'react-bootstrap'
import Header from '../../header';
import logo from '../../assets/logo8.png'
import Sidebar from '../../sidebar'
import '@fortawesome/fontawesome-free'


import {useHistory,Link} from 'react-router-dom';

const Thankyou =(props)=>{
   

    

return(

<div className='h-100 w-100 d-flex'>
    <Sidebar/>
    <div className=' h-100 w-100'>
    <Header/>
    <Card className='w-100 mh-100 jet my-auto mx-auto p-5'>
  
     
            <Card.Body>
             
   <h1>Thank you for </h1>
   <h4>for purchasing with us we are waiting for hear u again</h4>

   <h1
    style={{
        color:'#f5c71a',
        fontSize:'10vw',
        textAlign:'center'
    }}
   >
       
   <FontAwesomeIcon
  
                      className=" mr-1"
                      icon={faSmile}
                    />{" "}
        </h1>
  

            </Card.Body>
          
          
       </Card>
       </div>
</div>
)
}
export default Thankyou