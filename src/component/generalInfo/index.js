import React,{useEffect,useState} from 'react'

import { Card } from 'react-bootstrap'
import Header from '../../header';
import './generalinfo.css'
import Sidebar from '../../sidebar'
import '@fortawesome/fontawesome-free'

import ActivityOption from '../../component/activity_page_list'
import {useHistory,Link} from 'react-router-dom';
import Api from '../../Api';

const GeneralInfo =(props)=>{
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

<div className='h-100 w-100 d-flex'>
    <Sidebar/>
    <div className=' h-100 w-100'>
    <Header/>
    <div className='d-flex jet'>
      {activity&&
    <Card className='w-100 mh-100 h-100 news_section my-auto mx-auto p-5'>
  
    <h2>{activity.title} General Information </h2>
             
  
       
  <div className='infosection'>
  <h2 
  style={{marginBottom:'10%',
 fontSize:'2vw'
 }}
  >Select items </h2>
      <div className='singleInfo'>
      <h6 className='infotitle'>Title:</h6>
      <h6 className='infovalue'>{activity.title}</h6>
      </div>
      <div className='singleInfo'>
      <h6 className='infotitle'>Email:</h6>
     <h6 className='infovalue'>{activity.email}</h6>
      </div>
      <div className='singleInfo'>
      <h6 className='infotitle'>Phone:</h6>
     <h6 className='infovalue'>{activity.phome}</h6>
      </div>
      <div className='singleInfo'>
      <h6 className='infotitle'>Adress:</h6>
     <h6 className='infovalue'>{activity.location}</h6>
      </div>
      <div className='singleInfo'>
      <h6 className='infotitle'>start Time:</h6>
     <h6 className='infovalue'>{activity.duration&&activity.duration.start_time}</h6>
      </div>
      <div className='singleInfo'>
      <h6 className='infotitle'>End Time:</h6>
     <h6 className='infovalue'>{activity.duration&&activity.duration.end_time}</h6>
      </div>
   
  </div>
   
 

       
    </Card>}
    {activity&&
      <ActivityOption activity_data={activity}/>
    }
    
    </div>
   
       </div>
</div>
)
}
export default GeneralInfo