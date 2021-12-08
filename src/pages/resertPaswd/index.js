import React ,{useEffect, useState} from 'react'

import {
    Button
} from 'react-bootstrap'
import { faEye} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col,Row,Card ,Form} from 'react-bootstrap'
// import Login1 from '../../images/Login2.png'

import Icon from '../../assets/icon.png'
import Api from '../../Api'
import {useHistory} from 'react-router-dom';

const ResetPswd =()=>{
    const [formValues,setFormValues]=useState('')
    

   
    const history = useHistory();
  useEffect(()=>{
  document.getElementById('missmatchecd').style.visibility='hidden'
  },[])

    

  
     const resetpswd =(event)=>{
        event.preventDefault()
        const data=({
            phone:formValues.phone,
            password:formValues.password
        })
        console.log('ormValues.retype',formValues.retype)
        console.log('ormValues.retype',formValues.password)
        if(formValues.retype===formValues.password){
            Api.resetpswd(formValues.email,data)
            .then((res)=>{
              history.push('/')
           alert('Sucessfully changed')
            })
            .catch( alert('Information not match please try again') )
        }else{
            document.getElementById('missmatchecd').style.visibility='visible'
        }
     }


    

  
     const onChange = (event) => {
      const { name, value} = event.target;
      setFormValues({
        ...formValues,
        [name]: value
      });
      
      console.log('name',name)
      console.log('value',value)
    }

    const myFunction=(e)=> {
        let x
        if(e.target.id==='repswdeye'){
             x = document.getElementById("retype");
        }else{
            x = document.getElementById("password"); 
        }
      
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    }

return(

   <Row className='auth m-0 h-100 w-100'>
     
       <Card className='w-50  signUpMain jet pt-3 my-auto mx-auto '>
           
           <h5 className='text-center p-0 headindLogin mt-3 mb-4'>Reset Your password</h5>
           
           <form 
           className='loginForm w-50'
            onSubmit={resetpswd}
             >
  <div className="form-group">
  <Form.Label className="notes">
  Email ID:
                </Form.Label>
 
    <input
     onChange={onChange}
      type="email"  className="form-control  input-highlgt border-top-0 border-right-0  border-left-0 "  name="email" aria-describedby="emailHelp" placeholder="Enter your Email ID"/>
   
  </div>
  <div className="form-group">
  <Form.Label className="notes">
  Last Digit:
                </Form.Label>
 
    <input
     onChange={onChange}
      type="phone"  className="form-control  input-highlgt border-top-0 border-right-0  border-left-0 "  name="phone" aria-describedby="emailHelp" placeholder="Last Four mobile digit"/>
   
  </div>
  
  <div className="form-group ">
  <Form.Label className="notes">
  Password:
                </Form.Label>
  
    <input type="password"
     onChange={onChange}
    className="form-control border-top-0 border-right-0 h-25  border-left-0" 
    name="password"
    id='password'
    placeholder="Enter your Password"
    
    />
       <FontAwesomeIcon
                     toggle="#password-field" 
                     onClick={(e)=>myFunction(e)}
                     id='pswdeye'
                     style={{cursor:'pointer'}}
                     className="field-icon toggle-password"
                      icon={faEye}
                    />

  </div>

  <div className="form-group ">
  <Form.Label className="notes">
  Re-type:
                </Form.Label>
    <input type="password"
     onChange={onChange}
    className="form-control border-top-0 border-right-0 h-25  border-left-0" 
    name="retype"
    id='retype'
    placeholder="Re-type your Password"
    
    />
       <FontAwesomeIcon
                     toggle="#password-field" 
                     onClick={(e)=>myFunction(e)}
                     id='repswdeye'
                     style={{cursor:'pointer'}}
                     className="field-icon toggle-password"
                      icon={faEye}
                    />
    <label className='m-0 wrongpswd'  id='missmatchecd'>Password missmatched! Try again.</label>
  </div>

  <Button type="submit"
   onSubmit={resetpswd}
    className=" loginBtn w-100">Confirm</Button>
        <p 
          onClick={()=>history.push('/')}
          className='text-center subheadindLogin'>Please Login</p>
</form>
    
       </Card>
    
    
       
       </Row>

)
}
export default ResetPswd 
