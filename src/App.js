import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";
import React, { Component } from 'react';
import AdminDashboard from './pages/adminDashbord'
import './index.css';
import 'react-bootstrap'
import $ from 'jquery'
import CreateActivity from './pages/createActivity'
import Home from './pages/home'
import Detail from "./pages/detail";
import Auth from './pages/auth'
import SignUp from './pages/signUp'
import ResetPswd from "./pages/resertPaswd";
import ProductItem from "./pages/production";
import Thankyou from "./component/thanku";
import GeneralInfo from "./component/generalInfo/index";
import UpdateActivity from "./pages/updateActivity";
import Chat from './component/chat'
import Summary from "./component/summary";
import './pages/loading.css'


class App extends Component {
 
  render() {
   
    return (

      <BrowserRouter>      
          <Switch>
            {/* Authantication */}
            <Route path="/" exact component={Auth} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/admin" exact component={AdminDashboard} />
            <Route path="/admin/createActivity" exact  component={CreateActivity} />
            <Route path="/home" exact  component={Home} />
            <Route path="/home/news/:id" exact  component={Detail} />
            <Route path="/resetPassword" exact  component={ResetPswd} />
            <Route path="/home/productItem/:id" exact  component={ProductItem} />
            <Route path="/home/thankyou" exact  component={Thankyou} />
            <Route path="/home/generalinfo/:id" exact  component={GeneralInfo} />
            <Route path="/admin/updateactivity/:id" exact  component={UpdateActivity} />
            <Route path="/home/chat/:id" exact  component={Chat} />
            <Route path="/home/summary/:id" exact  component={Summary} />
          
          

            
           
            <Redirect from="/" to="/" />
          </Switch>
  
    



      </BrowserRouter>

    );
  }
}

export default App;






