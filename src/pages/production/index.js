import React ,{ useState,useEffect} from 'react'
import { Col,Row,Card,Button } from 'react-bootstrap'
import Header from '../../header';
import Sidebar from '../../sidebar'
import '@fortawesome/fontawesome-free'
import ActivityOption from '../../component/activity_page_list'
import Api from '../../Api';

import {useHistory,Link} from 'react-router-dom';

const ProductItem =(props)=>{
    const [checkList,setCheckList]=useState([])
    const history = useHistory();
  const [activity, setActivity] = useState([]);
  let url = window.location.pathname
  let id=url&&url.split('/')

      useEffect(()=>{
      id&&
      Api.getOneActivity(id[3])
      .then((res)=>{setActivity(res.data.data)
        console.log('signle nactivity List',res)
      })
      .catch((err)=>{
        err&& alert('please try again')})
      },[id[3]])
          const thanku_redirect=()=>{
              if(checkList&& checkList.length>0){
                  history.push('/home/thankyou')
              }else alert('please select Item')
              
          }

      const getcheckList =(e)=>{
      if(e.target.checked){
          setCheckList ([
              ...checkList,e.target.Id
            ])
      }else{
          const index = checkList.indexOf(e.target.Id);
                console.log('index',index)
                if (index > -1) {
                  checkList.splice(index, 1);
                }
      }
      }


return(

<div className='h-100 w-100 d-flex'>
    <Sidebar/>
    <div className=' h-100 w-100'>
    <Header/>
    <div className='d-flex jet'>
    <Card className='w-100 mh-100  h-100 news_section mt-0 mx-auto p-5'>
  
     {activity&&activity.products&& activity.products[0]?
     <Card.Body>
   
     <div className= "product-detail">
     <h2> Products for {activity.title} </h2>
     <div className= "img-select">
       {activity.products[0].product1&&
        <div className= "img-item">
       {console.log('urlImages',)}
     <a href = {activity.products[0].product1.url}  className='h-75' data-id = "1">
       <div className="productImgPreview">
       <img src = {activity.products[0].product1.url} alt = "shoe image"/>
       </div>
     

     </a>
     <div className = "purchase-info">
     <input
     id='1'
     onChange={(e)=>getcheckList(e)}
     type = "checkbox" className='mb-0' />

     <div className = "purchase-info"><b>${activity.products[0].product1.product_price}</b></div>
     <button type = "button" className= "btn h-25 mb-0">
     Add to Cart <i className= " fas fa-shopping-cart"></i>
     </button>
     </div>
     </div>
       }
    
   {activity.products[0].product2&&
      <div className= "img-item">
      <a href = {activity.products[0].product2.url} data-id = "4">
      <div className="productImgPreview">
      <img src = {activity.products[0].product2.url}alt = "shoe image"/>
       </div>
       
      </a>
      <div className = "purchase-info">
      <input    id='2'
      onChange={(e)=>getcheckList(e)} type = "checkbox" className='mb-0' />
 
      <div className = "purchase-info"><b>${activity.products[0].product2.product_price}</b></div>
      <button type = "button" className= "btn mb-0">
      Add to Cart <i className= " fas fa-shopping-cart"></i>
      </button>
 
 
      </div>
      </div>
   }
  
     {activity.products[0].product3&&
     <div className= "img-item">
     <a href = {activity.products[0].product3.url} data-id = "4">
      
       <div className="productImgPreview">
       <img src = {activity.products[0].product3.url} alt = "shoe image"/>
       </div>
     </a>
     <div className = "purchase-info">
     <input    id='2'
     onChange={(e)=>getcheckList(e)} type = "checkbox" className='mb-0' />

     <div className = "purchase-info"><b>${activity.products[0].product3.product_price}</b></div>
     <button type = "button" className= "btn mb-0">
     Add to Cart <i className= " fas fa-shopping-cart"></i>
     </button>


     </div>
     </div>
     }
     




     </div>

     </div>
  
       <Button 
         style={{
         float:'right',
         width:'15%'
         }}
       type="submit"
             onClick={thanku_redirect}
                 className=" loginBtn">Buy</Button>

 </Card.Body>:
  <Card.Body>
  <h2> No Data Found </h2>
</Card.Body> 
    }
 


</Card>
    <ActivityOption activity_data={activity}/>
    </div>
   
       </div>
</div>
)
}
export default ProductItem