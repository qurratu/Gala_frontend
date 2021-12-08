import React ,{ useState,useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faGrin } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import { Col,Row,Card,Button } from 'react-bootstrap'
import Header from '../../header';
import logo from '../../assets/logo8.png'
import './admin.css'
import Sidebar from '../../sidebar';
import axios from 'axios'
import Api from '../../Api';

import {useHistory,Link} from 'react-router-dom';

const AdminDashboard =()=>{
    const [formValues,setFormValues]=useState('')
    const [activityList,setActivityList]=useState('')
    const [totalPage,setTotalPage]=useState(1)
    const [selectedPage,setSelectedPage]=useState(0)

    const history = useHistory();

   
          useEffect(()=>{
            List_activity()
          },[])



          const List_activity=()=>{
            document.getElementById("careerLoader").classList.add("loading")
            Api.getActivity(1)
            .then((res)=>{
              if(res.data.data.length>9){
                let a=res.data.data.length
                let b=a%10
                if(b!==0){
                  setTotalPage(b+1)
                }else{
                  setTotalPage(b)
                }
              }
              console.log('res',res.data)
              setActivityList(res.data.data)
              document.getElementById("careerLoader").classList.remove("loading")
            })
            .catch((err)=>{
              console.log('Error',err)
              document.getElementById("careerLoader").classList.remove("loading")
             } )
          }
    
    const onChange = (event) => {
      const { name, value} = event.target;
      setFormValues({
        ...formValues,
        [name]: value
      });
      
    }

    const handlePageClick = (data) => {
      console.log('pagination',data)
      let selected = data.selected;
      // let offset = Math.ceil(selected * 10);
      setSelectedPage(selected);
    };

    const deleteActivity=(activityId)=>{
      window.confirm('Do you want to delete this Activity')
      Api.deleteActivity(activityId)
      .then((res)=>{
        List_activity()
        // alert('sucessfully deleted')
    })
      .catch((res)=>alert('please try again'))

    }

return(

<div className='h-100 w-100 d-flex'>
<Sidebar/>
    
    <div className=' h-100 w-100'>
    <Header/>
    <Card className='w-100 mh-100 jet my-auto mx-auto p-5'>
     
          <div 
          className="show-fetch-data-details mb-5">
            Showing {2} - {6} of top{" "}
            <strong>{activityList&& activityList.length} Activity </strong>
            available for Join
          </div>
          <div className='careerLoader' id='careerLoader' ></div>
     {activityList&& activityList.length>0&&activityList.map((item)=>(
          <Card className="clinic-list-card " key={item._id}>
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
                    
                    >{(`${item.title}`).replace(/[^\x00-\x7F]/g, "'")}</h5>
                    
                  </Link>
                  &nbsp;
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
                  121001  End:
                  121001
                
              </div>
              </Col>
            </Row>
              <Row className="mt-4">
                <Col sm={6}>
                  <Link
                    rel="canonical"
                    //  onClick={sessionStorage.setItem("clinicDetail", item)}
                    className="form-control view-profile-btn"
                    to={`/admin/updateactivity/${item._id}`}
                  >
                    Edit Activity
                  </Link>
                </Col>
                <Col sm={6}>
                  <Button
                    variant="primary"
                    onClick={() => deleteActivity(item._id)}
                    className="form-control book-btn"
                  >
                    Delete Activity
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
      />
       </Card>

       </div>


</div>



     
    
 
      

)
}
export default AdminDashboard