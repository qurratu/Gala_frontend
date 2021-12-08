import React ,{ useState} from 'react'
import { Modal, Button, Form, Col ,Card,Row} from "react-bootstrap";
import Header from '../../header';
import './updateactivity.css'
import {useHistory,Link} from 'react-router-dom';
import Datepicker from "react-datepicker";
import Api from '../../Api'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import image from '../../assets/upload_img.png';
import Sidebar from '../../sidebar'
import { useEffect } from 'react';
import MyEditor from '../../component/ckEditors'



const UpdateActivity =()=>{
  const [news, setNews] = useState(null);
  const [error, setError] = useState(true);
  const [activity, setActivity] = useState(null);
  const [summary, setSummary] = useState(null);
  const [file, setFile] = React.useState([])
    const [formValues,setFormValues]=useState('')
    const [validated, setValidated] = useState(false);
    const [firstDatePickerClass, setFirstDatePickerClass] = useState("");
    const [startDate, setStartDate] = useState((new Date(), 0), 9);
    const [secondOption, setSecondOption] = useState((new Date(), 0), 9);
    const [propsList, setPropsList] = useState([]);
    const [summaryStatus, setSummaryStatus] = useState(false);
    let url = window.location.pathname
    let id=url&&url.split('/')
  
useEffect(()=>{

  id&&
  Api.getOneActivity(id[3])
  .then((res)=>{setActivity(res.data.data)
    // selectFile(res.data.data.products)
    setPropsList(res.data.data.property)
  })
  .catch((err)=>{
    console.log('please try again',err)
    setError(false)
  alert('please try again')
  })
},[])


    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
        return currentDate.getTime() < selectedDate.getTime();
      };
          const history = useHistory();



          const update_activity=(e)=>{
            document.getElementById("careerLoader").classList.add("loading")
            e.preventDefault();
           
            window.confirm('Do you want to update this Activity')
            const data= ({
              title: formValues.title?formValues.title:activity.title,
              email:formValues.email?formValues.email:activity.email ,
              phone: formValues.phone?formValues.phone:activity.phone,
              location: formValues.adress?formValues.adress:activity.location,
              property:propsList?propsList:activity.property,
              created_date:startDate ?startDate:activity.created_date,
              news: news?news:activity.news,
              summaryStatus:summaryStatus?summaryStatus:activity.summaryStatus,
              summary:summary?summary:activity.summary,
              products: file?formValues.title:activity.products,
              duration:secondOption?secondOption:activity.duration,
        })
                Api.updateActivity(id[3],data)
                .then(()=>{
                    // alert('sucessfull')
                    history.push('/admin')
                })
                .catch((err)=>{
                  document.getElementById("careerLoader").classList.remove("loading")
                 alert('please try again',err.massage)
                })
    }
    

    // make input as btn and show uploaded image
    const selectFile=(e)=> {
      // let name=e.target.name
      const { name,files} = e.target;
      let body = new FormData();
      body.append("files", e.target.files[0]);
      const imgPreview = document.getElementById(e.target.id).previousSibling;
      if (files[0]) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
        fileReader.addEventListener("load", function () {
          imgPreview.style.display = "block";
          imgPreview.innerHTML = '<img src="' + this.result + '" />';
        });    
      }

      Api.uploadImg(body)
      .then((res) => {
        setFile({
          ...file,
          [name]:res.data.data
        })
       
      })
      .catch((err) => {
        console.log('imgUrl',err)
      });
   
    }



        const ditachctivity=(item)=>{
          document.getElementById("careerLoader").classList.add("loading")
          console.log('actitt ite',item)
            Api.ditachActivitybyadmin(item.activity_id,item.user_id._id)
                .then(()=>{
                  document.getElementById("careerLoader").classList.remove("loading")
                    alert('sucessfull joined')
                })
                .catch(()=>{
                  document.getElementById("careerLoader").classList.remove("loading")
                  alert('please try again')
                })
      }


     const onChange = (event) => {
      const { name, value,files} = event.target;
      if(event.target.name==='product1_price'){
        file.product1['product_price'] = value;
       }else if(name==='product2_price'){
        file.product2['product_price'] = value;
       }else if(name==='product3_price'){
        file.product3['product_price'] = value;
       }
      setFormValues({
        ...formValues,
        [name]: value
      });
     console.log('namename',name) 
     console.log('valuevalue',value) 
    }
    const handleFirstDate = (date) => {
        if (date) {
          setFirstDatePickerClass("first-datepicker-input-valid");
        } else {
          setFirstDatePickerClass("");
        }
        setStartDate(date);
      };
  

      const addItem=()=>{
        if(propsList.length<6){
          let number=document.getElementById("mandatItem").value
          if(number){
            setPropsList ([
             ...propsList,number
            ])
            document.getElementById("mandatItem").value=''
          } else
            alert('insert item')
        }else
          alert('you have added maximum no of item')
      }

   
        const deleteItem=(e)=>{
          const index = propsList.indexOf(e);
          console.log('index',index)
          if (index > -1) {
            propsList.splice(index, 1);
          }
        }

      return(
     
      <div


      className=' w-100 h-100 d-flex'>
      <Sidebar/>
          
          <div className=' h-100 w-100'>
          <Header/>
          <Card className='w-100 jet my-auto mx-auto p-5'>
          Update activity
          <div className='careerLoader' id='careerLoader' ></div>
          {activity?
          <Form
                  onSubmit={(e)=>update_activity(e)}
                  className="bookform w-75"
                  noValidate
                  validated={validated}
                  onChange={onChange}
                >
                  <Form.Group className='createActivityRow' as={Row}>
                    <h5>Your information</h5>
                  </Form.Group >
                  <Form.Group className='createActivityRow' as={Row}>
                    <Form.Group as={Col} sm="12" md="6" controlId="formGridText">
                      <Form.Label className="notes">Title *</Form.Label>
                      <Form.Control
                        required
                        name='title'
                        type="text"
                        defaultValue={activity.title}
                        placeholder="Mauro Sicard"
                      />
                    </Form.Group>
                    <Form.Group as={Col} sm="12" md="6" controlId="formGridEmail">
                      <Form.Label className="notes">Email Address *</Form.Label>
                      <Form.Control
                        required
                        type="email"
                        name="email"
                        defaultValue={activity.email}
                        placeholder="contact@maurosicard.com"
                      />
                    </Form.Group>
                  </Form.Group >
                
                  <Form.Group  className='createActivityRow' as={Row}>
                    <Form.Group
                      as={Col}
                      sm="12"
                      md="6"
                      required
                      controlId="formGridPhoneNumber"
                    >
                      {console.log('myNumber',activity.phone)}
                      <Form.Label className="notes">Mobile or Phone Number *</Form.Label>
                      <Form.Control
                        name="phone"
                        type="number"
                        // inputmode="tel"
                        defaultValue={activity.phone}
                        required
                        placeholder="(913)-781-6410"
                      />
                    
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      sm="12"
                      md="6"
                      required
                      controlId="formGridPhoneNumber"
                    >
                      <Form.Label className="notes">Location *</Form.Label>
                      <Form.Control
                        name="adress"
                        type="text"
                        defaultValue={activity.location}
                        required
                        placeholder="adress..."
                      />
                    
                    
                    </Form.Group>
                    
                  </Form.Group >

                


                  <div className='createActivityRow'>
                  <Form.Label >
                      Please select your preferred Activity times
                      </Form.Label>
                
                  <Form.Group  as={Row}>
                    <Form.Group
                      as={Col}
                      sm="12"
                      md="6"
                    
                      required
                      controlId="formGridFstoption"
                    >
                      <Form.Label className="notes">Start Time *</Form.Label>
                      <Datepicker
                        placeholderText="Aug 6, 12:00AM"
                        wrapperClassName="datepicker-wrapper"
                        className={`datepicker-input ${firstDatePickerClass}`}
                        selected={startDate}
                        onChange={(date) => handleFirstDate(date)}
                        showTimeSelect
                        name="time_1"
                        defaultValue={activity.created_date}
                        filterTime={filterPassedTime}
                        dateFormat="MMMM d, hh:mm aa"
                        required
                        timeFormat="hh:mm: aa"
                        timeIntervals={15}
                      />
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      sm="12"
                      md="6"
                    
                      controlId="formGridScndOption"
                    >
                      <Form.Label className="notes">End Date</Form.Label>
                      <Datepicker
                        placeholderText="Aug 6, 12:00AM"
                        wrapperClassName="datepicker-wrapper"
                        className="datepicker-input"
                        selected={secondOption}
                        value={secondOption}
                        onChange={(date) => setSecondOption(date)}
                        showTimeSelect
                        defaultValue={activity.duration}
                        name="time_2"
                        filterTime={filterPassedTime}
                        dateFormat="MMMM d, hh:mm aa"
                        timeFormat="hh:mm: aa"
                        timeIntervals={15}
                      />
                    </Form.Group>
              
                  </Form.Group >
                  </div>
            



                



                  
              


                    <div className='createActivityRow'>
                        
                  <Form.Label className="productImages notes">
                        Add product
                      </Form.Label>
                      <Form.Group  as={Row}>
                          <Form.Group as={Col} sm="12" md="4"controlId="formGridEmail" > 
                          <form>
                              <div>
                                <div id="img-preview"></div>
                                <input type="file" id="product1"
                                 onChange={selectFile} name="product1" accept="image/*" />
                                <div className='price' id="Price_product1"></div>
                                <label htmlFor="product1" className='chooseFile'>Choose File</label>
                              
                              </div>
                            </form>
                          </Form.Group>
                          <Form.Group as={Col} sm="12" md="4"controlId="formGridEmail" > 
                          <form>
                              <div>
                                <div id="img-preview"></div>
                                <input type="file" id="product2" onChange={selectFile} name="product2" accept="image/*" />
                                <div className='price' id="Price_product2"></div>
                                <label htmlFor="product2" className='chooseFile'>Choose File</label>
                              
                              </div>
                            </form>
                          </Form.Group>
                          <Form.Group as={Col} sm="12" md="4"controlId="formGridEmail" > 
                          <form>
                              <div>
                                <div id="img-preview"></div>
                                <input type="file" id="product3" onChange={selectFile} name="product3" accept="image/*" />
                                <div className='price' id="xPrice_product3"></div>
                                <label htmlFor="product3" className='chooseFile'>Choose File</label>
                              
                              </div>
                            </form>
                          </Form.Group>
                      </Form.Group>
                  </div>

                  <div className='createActivityRow'>
                  <Form.Label className="notes">
                      News Section
                      
                      </Form.Label>
                      <MyEditor
                      defaultdata={activity.news&&activity.news}
                      // defaultdata="<p>Enter the News About Activity</p>"
                          handleChange={(data) => {
                            setNews(data);
                          }}
                          data={news}
                          // {...props}
                        />

                  <Form.Group as={Row}>
                    <Form.Group as={Row}>
                    <Form.Group
                      as={Col}
                      sm="12"
                      md="6"
                      lg="4"
                      required
                    className=" input_image hide_on_hover common_class" id="hide_image1"
                    >
                    </Form.Group>
                    </Form.Group>
                  </Form.Group>
                  </div>
              
                  <div className='createActivityRow'>
                  <Form.Label className="notes">
                    <input type='checkbox' onChange={(e)=>setSummaryStatus(e.target.checked)} defaultChecked={activity.summaryStatus} name='summarystatus' className='mr-2'/>
                        Summary of Activity
                      </Form.Label>
                      <MyEditor
                         defaultdata={activity.summary}
                         handleChange={(data) => {
                          setSummary(data);
                        }}
                        data={summary}
                        />
                  </div>

                  <Row>
                      {activity.participant&&activity.participant.length>0&&activity.participant.map((item)=>(
                           <div className='createActivityRow w-50'>
                           <Form.Label className="notes">
                           participant List
                               </Form.Label>
                        <Card className='participatant'>
                            <div className='useImg w-25'>
                              <image/>
                            </div>
                            {item.user_id&&
                             <div className='joined_title w-50'>{`${item.user_id.first_name} ${item.user_id.last_name}`}</div>
                            }
                           
                            <Button
                                variant="secondary"
                                size="lg"
                                onClick={()=>ditachctivity(item)}
                                style={{float:'right'}}
                                type='button'
                                className="addbtn h-100 w-25 ml-0"
                              >
                                Exit
                                </Button>
                   </Card>
                   </div>
                    ))}
                   
                  
                  <div className='createActivityRow w-50'>
                  <Form.Label className="notes">
                      Add CheckList Items
                      </Form.Label>
                  <Form.Group className=''  as={Row}>
                    <Form.Group   as={Col} sm="12" md="8"controlId="formGridEmail">
                    <Form.Control
                        required
                        type="text"
                        id='mandatItem'
                        name="Title"
                        className='h-100 mb-3'
                        placeholder="Mauro Sicard"
                      />
                    </Form.Group>
                    <Form.Group   as={Col} sm="12" md="2"controlId="formGridEmail">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={addItem}
                type='button'
                    className="addbtn h-100  "
                  >
                    Add
                  </Button>
                    </Form.Group>
                      <div className='mt-3 ml-3'>
                        {propsList&&propsList.length>0&&propsList.map((item)=>(
                          <span className='deleteItem mx-1'>{item}
                          <span
                          id={item} 
                          onClick={(e)=>deleteItem(e.target.id)}
                          className='deleteItem'
                          >x</span>
                          </span>
                        ))}
                    </div>
                  </Form.Group >
                  </div>
                  </Row>
      <div>
      </div>
                  <Button
                    variant="secondary"
                    size="lg"
                    block
                    type='submit'
                  // onClick={}
                    className="bookform-button "
                  >
                  Save
                  </Button>
                </Form>:<h1> facing some technical! please try again </h1>
      }   
            </Card>
            </div>
      </div>
)
}
export default UpdateActivity