import {useHistory,Link} from 'react-router-dom';
import Api from '../../Api';
const ActivityOption=(props)=> {
  const history = useHistory();
  let url = window.location.pathname
    let id=url&&url.split('/')

    const joinactivity=(item)=>{
    const data=({participate: false}) 
    id&&  Api.joinedActivityparticipant(id[3],data)
      .then(()=>{alert('activity sucessfully joined')
    })
      .catch((err)=>{alert('please try again',err)})
    }
    

  return (
    <div className='activiyoptions h-100'>
    <div className='mb-2'>
    <span
                      rel="canonical"
                      onClick={joinactivity}
                      className="form-control view-profile-btn"
                    //   to={`/home`}
                    >
                      Exit Activity
                    </span>
      </div>
    <div className='mb-2'>
      <Link 

          className='activityList'
          to={`/home/generalinfo/${id[3]}`}>  
        
          {" "}General Info</Link>
      </div>
      {props.activity_data&&
        <div  className='mb-2 pr-0'>
        <Link 
      className='activityList pr-0'
      to={`/home/productItem/${id[3]}`}>
        
        Product</Link>
        </div>
      }
    
      {props.activity_data.news&&
       <div  className='mb-2'>
       <Link 
     className='activityList'
     to={`/home/news/${id[3]}`}>  
     News
     </Link>
       </div>
      }
      <div  className='mb-2'>
      <Link 
    className='activityList'
    to={`/home/chat/${id[3]}`}>
      
      Chat</Link>
  
      </div>
      {props.activity_data.summaryStatus&&
        <div  className='mb-2'>
        <Link 
      className='activityList'
      to={`/home/summary/${id[3]}`}>
        Summary</Link>
        </div>
      }
    
   
</div>
  );
}

export default ActivityOption;