"use strict"
import React from 'react';
import {Form, FormGroup, Col, FormControl, Button, ControlLabel, Panel, Well, Row, Alert} from 'react-bootstrap';
import {findDOMNode} from 'react-dom';
import {AddUser} from '../../actions/userActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';

let latitude,longitude ;

class Register extends React.Component {

    Signup(){
        const registerForm ={
            email:findDOMNode(this.refs.email).value,
            password:findDOMNode(this.refs.password).value,
            rpassword:findDOMNode(this.refs.rpassword).value,
            latitude:Number(findDOMNode(this.refs.latitude).innerHTML),
            longitude:Number(findDOMNode(this.refs.longitude).innerHTML)
        };
       this.props.AddUser(registerForm); 
    }

    // Redirect to login component after registeration return success msg
    componentDidUpdate(){
        if(this.props.user.message == "success") browserHistory.push('/');

    }

    render() {
      return (
        <Well>
       {(this.props.user.message)?  
            (
                <Alert bsStyle="danger">
                    <strong>{this.props.user.message}!</strong>
                </Alert>
            ):''
        }
         <Form horizontal>
           <FormGroup controlId="formHorizontalEmail">
               <Col componentClass={ControlLabel} sm={3}>
                   Email
         </Col>
               <Col sm={5}>
                   <FormControl type="email" ref="email" placeholder="Email" required="true"/>
               </Col>
           </FormGroup>

           <FormGroup controlId="formHorizontalPassword">
               <Col componentClass={ControlLabel} sm={3}>
                   Password
               </Col>
               <Col sm={5}>
                   <FormControl type="password" ref="password" placeholder="Password" required="true"/>
               </Col>

           </FormGroup>

           <FormGroup controlId="formHorizontalRepeatPassword">
               <Col componentClass={ControlLabel} sm={3}>
                   Repeat Password
               </Col>
               <Col sm={5}>
                   <FormControl type="password" ref="rpassword" placeholder="Repeat Password" required="true"/>
               </Col>
           </FormGroup>

           <FormGroup controlId="formHorizontalPosition">
               <Col componentClass={ControlLabel} sm={3}>
                   Your Current Position : 
               </Col>
               <Col sm={5}>
                   <span>latitude: <strong id="latitude" ref="latitude"></strong></span><br/>
                   <span>longitude: <strong id="longitude" ref="longitude"></strong></span><br/>
                   <strong id="alert">Please wait until your position appears </strong>
               </Col>
           </FormGroup>

           <FormGroup>
               <Col smOffset={3} sm={5}>
                   <Button 
                        onClick={this.Signup.bind(this)} 
                        bsStyle="primary" >
                        Sign me up
                    </Button>
               </Col>
               
           </FormGroup>
           <FormGroup>
                <Col smOffset={3} sm={6}>
                 Alredy have an account?<a href="/">Sign in</a> now.
                </Col>
            </FormGroup>
       </Form>
         
       </Well>)
    }
}
(function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
   })();
    
   function showPosition(position) {
       if(document.getElementById("latitude") !== null){
           document.getElementById("latitude").innerHTML = position.coords.latitude.toFixed(5);
           document.getElementById("longitude").innerHTML = position.coords.longitude.toFixed(5);
           document.getElementById("alert").innerHTML="Thank you!";
       }
    
}
function mapStateToProps(status){
    return {
        user : status.user.user
      };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({AddUser},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Register);