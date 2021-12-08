import React ,{ useState,useEffect} from 'react'
import Header from '../../header';
import './detail.css'
import renderHTML from 'react-render-html';
import { Modal, Button, Form, Col ,Card,Row} from "react-bootstrap";
import Sidebar from '../../sidebar'
import '@fortawesome/fontawesome-free';
import ActivityOption from '../../component/activity_page_list'
import Api from '../../Api';
import {useHistory,Link} from 'react-router-dom';

const Detail =()=>{
  const [activity, setActivity] = useState([]);
  let url = window.location.pathname
  let id=url&&url.split('/')

        useEffect(()=>{
        id&&
        Api.getOneActivity(id[3])
        .then((res)=>{setActivity(res.data.data)
         
        })
        .catch((err)=>{
          err&& alert('please try again')})
        },[id[3]])
        console.log('signle nactivity List',activity)
    

return(
<>
<div className='h-100 w-100 d-flex'>
<Sidebar/>
    <div className=' h-100 w-100'>
    <Header/>
    <div className='d-flex jet'>
{activity?
 <Card className='w-100 news_section h-100 my-auto mx-auto py-5 d-flex'>
 <h3 >{`${activity.title} News `}</h3>
 {activity.news&&
 renderHTML(activity.news)
 }
      
                  </Card>:
                   <Card className='w-100 news_section h-100 my-auto mx-auto py-5 d-flex'>
                   <h3 >No Data Found</h3>
                   
                        
                                    </Card>


}
      
          {activity&&
              <ActivityOption activity_data={activity}/>
          }
          </div>
       </div>


</div>

     
    
    </>
      

)
}
export default Detail