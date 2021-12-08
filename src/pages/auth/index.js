import React ,{useEffect, useState} from 'react'
import './auth.css';
import {
    Button
} from 'react-bootstrap'
import { faEye} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col,Row,Card } from 'react-bootstrap'
// import Login1 from '../../images/Login2.png'

import Icon from '../../assets/icon.png'
import Api from '../../Api'
import {useHistory} from 'react-router-dom';

const Auth =()=>{
    const [formValues,setFormValues]=useState('')
    const [loginPage,setLoginpage]=useState('')

   
    const history = useHistory();
   let path = window.location.pathname 
   
   

  useEffect(()=>{
  if(path==='/'){
    setLoginpage('Client')
  }else if(path==='/Manager-auth'){
    setLoginpage('Project Manager')
  }
  },[])

      function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        let detail=JSON.parse(jsonPayload)
        localStorage.setItem('userType',detail.role)
        localStorage.setItem('userId',detail._id)
    
        if(detail.role==='admin'){
                  history.push('/admin')
                }else history.push('/home')
        return JSON.parse(jsonPayload);
    }

  
     const Login =(event)=>{
        event.preventDefault()
        document.getElementById("careerLoader").classList.add("loading");
        const data=({
            email:formValues.email,
            password:formValues.password
        })
          Api.login(data)
          .then((res)=>{
            localStorage.setItem('access_token',res.data.token)
            parseJwt(res.data.token)
            // document.getElementById("careerLoader").classList.remove("loading");
          })
          .catch(()=>{
            
          document.getElementById("careerLoader").classList.remove("loading")
            document.getElementById('wrongpswd').style.visibility='visible'
           } )

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

    const myFunction=()=> {
      var x = document.getElementById("password");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    }

return(

   <Row className='auth m-0 h-100 w-100'>
     
       <Card className='w-50 h-75 jet my-auto mx-auto p-5'>
           <Col className='h-100 w-75 '>
           <Row  className='w-100 d-flex  logologin m-auto '>
             {/* <div  className='pr-2 h-100 flixImg'> */}
             <img 
             src={Icon} 
              className='authImg'alt='currupt img'/>
             {/* </div> */}
          
               
               
               
           </Row>
           <Col className='loginform p-0 mt-4 ml-0 mr-0 '>
           <h5 className='text-center p-0 headindLogin'>Welcome to Gala</h5>
           {/* <p className='text-center subheadindLogin'>Please Sign in to your account</p> */}
           <div className='careerLoader' id='careerLoader' ></div>
           <form className='h-50 '
           className='loginForm'
            onSubmit={(e)=>{Login(e)}}
             >
  <div className="form-group">
    <label htmlFor="exampleInputEmail1 m-0">Email ID:</label>
    <input
     onChange={onChange}
      type="email"  className="form-control  input-highlgt border-top-0 border-right-0  border-left-0 "  name="email" aria-describedby="emailHelp" placeholder="Enter your Email ID"/>
   
  </div>
  
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password:</label>
    <span className='d-flex field-iconL'>
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
                     id='pswd'
                     style={{cursor:'pointer',
                    marginLeft:'-10%'
                    }}
                     className=" iconeEyeLogin h-100 toggle-password"
                      icon={faEye}
                    /></span>
    <label className='m-0 wrongpswd'  id='wrongpswd'>Incorrect Password! Try again.</label>
  </div>

  <Button type="submit"
    className=" loginBtn w-100">Login</Button>
    <span className='d-flex  pt-2 justify-content-center'>
    <p 
          onClick={()=>history.push('/resetPassword')}
          className='text-center subheadindLogin '>forgot Password /</p>
    <p 
          onClick={()=>history.push('/signup')}
          className='text-center subheadindLogin'> Please Signup</p>
    </span>
     
</form>
           </Col>
           </Col>
       </Card>
    
    
       
       </Row>

)
}
export default Auth