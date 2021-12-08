import React ,{ useState,useEffect} from 'react'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faGrin ,faSearch} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import './home.css'
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from "react-paginate";
import { Col,Row,Card,Button } from 'react-bootstrap'
import Header from '../../header';
import logo from '../../assets/logo8.png'
import Sidebar from '../../sidebar'
import '@fortawesome/fontawesome-free'
import Api from '../../Api';


import {useHistory,Link} from 'react-router-dom';

const Home =()=>{
    const [formValues,setFormValues]=useState('')
    const [activityList,setActivityList]=useState('')
    const [totalPage,setTotalPage]=useState(1)
    const [selectedPage,setSelectedPage]=useState(0)
    const history = useHistory();

   
          useEffect(()=>{
            List_actiivity()
          },[selectedPage])



          const List_actiivity=(pageno)=>{
            document.getElementById("careerLoader").classList.add("loading")
            Api.getActivity(pageno)
          .then((res)=>{
            setActivityList(res.data.data)
            if(res.data.data.length>9){
              let a=res.data.data.length
              let b=1
              b=a%10
              if(b!==0){
                setTotalPage(b+1)
              }else{
                setTotalPage(b)
              }
            }
            document.getElementById("careerLoader").classList.remove("loading")
          })
          .catch((err)=>  document.getElementById("careerLoader").classList.remove("loading"))
        }


          console.log('res',activityList)

     const onChange = () => {
       if(formValues){
        let a= activityList.filter((item)=>{
          if( item.title===formValues||item.title.includes(formValues))
          return item
         })
         if(a.length>9){
          let a=a.length
          let b=a%10
          if(b!==0){
            setTotalPage(b+1)
          }else{
            setTotalPage(b)
          }
        }else{setTotalPage(1)}
         setActivityList(a)
       }else{
        List_actiivity()
       }
     
    }

    const joinactivity=(item)=>{
      document.getElementById("careerLoader").classList.add("loading")
      let id= localStorage.getItem('userId')
    const data=(
      {
        participate: !item.enrolled
    }
    ) 
    id&&  Api.joinedActivityparticipant(item._id,data)
      .then(()=>{
        alert('activity sucessfully joined')
        document.getElementById("careerLoader").classList.remove("loading")
      List_actiivity()
    })
      .catch(()=>{alert('please try again')
      document.getElementById("careerLoader").classList.remove("loading")}
      )
    }


    const handlePageClick = (data) => {
      console.log('pagination',data)
      let selected = data.selected;
      // let offset = Math.ceil(selected * 10);
      setSelectedPage(selected);
    };
    



    
return(
<>
<div className='h-100 w-100 d-flex'>
<Sidebar/>
    
    <div className=' h-100 w-100'>
    <Header/>
    <Card className='w-100 mh-100 jet my-auto mx-auto p-5'>
    <div className='careerLoader' id='careerLoader' ></div>

    {activityList&& activityList.length>0&&
    <>
    
    
     {/* search bar */}

     <form className="example"  style={{
      marginBottom:'30px',
       width:'450px'
     }}>
        <input type="text" onChange={(e)=>setFormValues(e.target.value)} placeholder="Search.." name="search2"/>
        <button type="button"
        onClick={onChange}
        >
          
        <FontAwesomeIcon
                    className="searchIcon mr-1"
                    icon={faSearch}
                  />{" "}
 
  </button>
      </form>
      {/* total no of data */}
        <div 
        className="show-fetch-data-details mb-4">
          Showing {2} - {6} of top{" "}
          <strong>{activityList&& activityList.length} Activity </strong>
          available for Join
        </div>

       
      {/* list of activity */}
      {activityList.map((item)=>(
      <Card className="clinic-list-card ">
          <Card.Body>
            <Row className="align-items-center">
              <Col sm={2} className="text-right">
              <img  src={logo} className='h-50'/>
              </Col>
              <Col sm={10} className="text-left mw-75">
                <div className="card-header">
                <span className="profile-title">
                  <Link
                    className="clinic-name"
                    rel="canonical"
                  //   onClick={localStorage.setItem(
                  //     "clinicDetail",
                  //     JSON.stringify(item)
                  //   )}
                  //   to={`${localRoute.details}/${slugName}-at-${item.slug}`}
                  >
                    <h5
                    style={{fontSize:'1.5vw'}}
                    onClick={()=>history.push('/home/generalinfo')}
                    >{(`${item.title}`).replace(/[^\x00-\x7F]/g, "'")}</h5>
                   
                  </Link>
                  &nbsp;
                    {/* <span className="plan-premier align-top">
                      &nbsp;Premier Partner
                    </span> */}
                </span>{" "}
                </div>
                <div
                className="profile-address mt-2">
                  <FontAwesomeIcon
                    className="clinic-map-icon mr-1"
                    icon={faMapMarkerAlt}
                  />{" "}
                  {item.location}
                
              </div>
              <div
                
                className="profile-address mt-2">
                
                  {/* <FontAwesomeIcon
                    className="clinic-map-icon mr-1"
                    icon={faMapMarkerAlt}
                  />{" "} */}
                 Start:
                 {item.duration&&item.duration.start_time}  End:
                 {item.duration&&item.duration.end_time}
                
              </div>
              </Col>
            </Row>
              <Row className="mt-4">
                <Col sm={6}>
                  {!item.enrolled?
                  <Button
                    rel="canonical"
                  onClick={()=>joinactivity(item)}
                    className="form-control view-profile-btn"
                  //   to={`${localRoute.details}/${slugName}-at-${item.slug}`}
                  >
                    Join Activity
                  </Button>:
                    <Button
                    rel="canonical"
                  onClick={()=>joinactivity(item)}
                    className="form-control view-profile-btn"
                  //   to={`${localRoute.details}/${slugName}-at-${item.slug}`}
                  >
                   Exit Activity
                  </Button>
                }
                
                </Col>
                <Col sm={6}>
                  <Button
                    variant="primary"
                    onClick={()=>history.push(`/home/news/${item._id}`)}
                    className="form-control book-btn"
                  >
                    Show Activity
                  </Button>
                </Col>
              </Row>
           
          </Card.Body>
        </Card>
      ))}

        
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={totalPage}
        initialSelected={2}
        forcePage={selectedPage}
        marginPagesDisplayed={3}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        breakClassName="page-item"
        breakLabel={
          <a rel="canonical" className="page-link">
            ...
          </a>
        }
        pageClassName="page-item"
        previousClassName="page-item"
        nextClassName="page-item"
        pageLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        activeClassName="active"
        // onPageChange={handlePageClick}
      /></>
    }
       </Card>
       
       

       
       </div>


</div>

     
    
    </>
      

)
}
export default Home