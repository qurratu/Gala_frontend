import React, { useState ,useEffect} from 'react'
import { Modal, Button, Form, Col ,Card,Row} from "react-bootstrap";
// import { Card } from 'react-bootstrap'
import './chat.css'
import Header from '../../header';
import Sidebar from '../../sidebar'
import '@fortawesome/fontawesome-free'

import ActivityOption from '../../component/activity_page_list'
import { faHome, faUser,faLayerGroup} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Api from '../../Api';

const Chat =(props)=>{
  const [chatlist, setChatList] = useState([]);
  const [chat, setChat] = useState([]);
  const [activity, setActivity] = useState([]);
  let url = window.location.pathname
  let id=url&&url.split('/')

        useEffect(()=>{
          Api.getOneActivity(id[3])
          .then((res)=>{setActivity(res.data.data)
          })
          .catch((err)=>{
          console.log('please try again')})
          getChatList()
        },[id[3]])



          const getChatList=()=>{
            id&&
            Api.getgroupchat(id[3])
            .then((res)=>{
              setChatList(res.data.data.conversation)
              console.log('signlechat List',res)
            })
            .catch((err)=>{
              // err&& alert('please try again')
              console.log(err)
            })
             
          }
  
      const deletechat=(massageId)=>{
        window.confirm('are tyou sure to delete')
        Api.getgroupchat(massageId)
        .then((res)=>{
          getChatList()
          console.log('signle nactivity List',res)
        })
        .catch((err)=>{
          err&& alert('please try again')})

      }
      const add_massage=()=>{
       const data=({
        messageText:chat
        })
        Api.groupchat(id[3],data)
        .then((res)=>{
          getChatList()
          // setChatList(res.data.data)
          console.log('signle nactivity List',res)
        })
        .catch((err)=>{
          console.log('chatERR',err)
          err&& alert('please try again')})

      }
return(

<div className='h-100 w-100 d-flex'>
    <Sidebar/>
    <div className=' h-100 w-100'>
    <Header/>
    <div className='d-flex jet'>
    <Card className='w-100 mh-100 h-100 news_section my-auto mx-auto p-5'>
    <h4>Chat with Activity participants </h4>
    <div className='createActivityRow w-50'>
      {chatlist&&chatlist.length>0?
      chatlist.map((item)=>(
        <Card className='participatant singleChat comented_chat'>
                     
       <div className='useImg w-25 h-100'>
       <FontAwesomeIcon
          className="chatIcon mr-1"
          icon={faUser}
          />{" "}
         <image/>
       </div>
       <div className=' chat_msg w-75 h-100'>fffffffffffffffffffffffff</div>
       <Button
                                variant="secondary"
                                size="lg"
                                // onClick={(e)=>deletechat(item.target.id)} 
                                style={{float:'right'}}
                                type='button'
                                className="addbtn h-100 w-25 ml-0"
                              >
                                delete
                                </Button>
       {/* <div 
      //  onClick={(e)=>deletechat(item.target.id)} 
       className='w-25 delete_chat h-100'>delete</div> */}
    
          </Card>
      ))
       : <div className='w-75'>No chat yet</div>
    }
                  
                   <Card className='participatant singleChat'>
                     
                          <input className='chatInput' onChange={(e)=>setChat(e.target.value)} placeholder='comment plz....'/>
                            <Button
                                variant="secondary"
                                size="lg"
                                onClick={add_massage}
                                style={{float:'right'}}
                                type='button'
                                className="addbtn h-100 w-25 ml-0"
                              >
                                comment
                                </Button>
                   </Card>

                   
                  </div> 
      
   
    </Card>
    {activity&&
      <ActivityOption activity_data={activity}/>
    }
    </div>
   
       </div>
</div>
)
}
export default Chat