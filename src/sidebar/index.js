// import './header.css'
import Icon from '../assets/icon.png'
import React ,{useEffect,useState} from'react'
import { Card,Col} from 'react-bootstrap'
import {useHistory,Link} from 'react-router-dom';
import { faHome, faUser,faLayerGroup} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './sidebar.css'
import './../App.css'
import logo from '../assets/logo8.png'

import Api from '../Api';
const Sidebar=()=> {
  const [joinedList,setJoinedList]=useState('')
  const history = useHistory();
let id= localStorage.getItem('userId')
let loginType= localStorage.getItem('userType')
useEffect(()=>{
  id&&
  Api.joined_activity_list(id)
  .then((res)=>{setJoinedList(res.data.data)
    // console.log('setJoinedList=============',res)
  })
},[])

console.log('setJoinedList',joinedList)
  return (
  

<Card 

className="sidebar h-100">
<div
className='h-25'
>
<img 
 style={{cursor:'pointer'}}
onClick={()=>history.push('/home')}

src={Icon} className='h-50'/>
</div>
{loginType&&loginType==='admin'?

<div>
<div className='mb-3'>
  <Link 
      className='adminList'
      to="/admin">  <FontAwesomeIcon
      className="searchIcon mr-1"
      icon={faHome}
      />{" "}Home</Link>
  </div>
  <div  className='mb-3'>
  <Link 
className='adminList'
to="/admin/createActivity">
   <FontAwesomeIcon
      className="searchIcon mr-1"
      icon={faLayerGroup}
      />{" "}
  Add Activity</Link>
  </div>
  <div  className='mb-3'>
  <Link 
className='adminList'
to="/admin/createActivity">  
  <FontAwesomeIcon
      className="searchIcon mr-1"
      icon={faUser}
      />{" "}
profile</Link>
  </div>
</div>:
  <span className='joinedList '>
{joinedList&&joinedList.length&& joinedList.map((item)=>(
<>
    {item.activity_id&&
     <Card
     style={{cursor:'pointer'}}
     onClick={()=>history.push(`/home/news/${item.activity_id._id}`)} className='mx-3 joinedactivity px-2'>
      {/* <div className="text-right activity_logo"> <img  src={logo} className='h-50'/></div> */}
      <div className='h-100 w-75 d-flex flex-column'>
          <span className='joined_title  my-0 py-0'>{item.activity_id.title}</span>
          {item.activity_id.duration&&
          <>
              <span className='schedule_time h-25 my-0 py-o'>Start: {
              item.activity_id.duration[0].start_time&&
              item.activity_id.duration[0].start_time.replace('T',' ').replace(':00.000Z',' ')}</span>
              <span className='schedule_time my-0 h-25 py-0'>End: {
              item.activity_id.duration[0].end_time&&
              item.activity_id.duration[0].end_time.replace('T','  ').replace(':00.000Z',' ')}</span>
            </>        
          }
        </div>

      
       </Card>
    }

</>
))
}

</span>




}


</Card>

  
  );
}

export default Sidebar;