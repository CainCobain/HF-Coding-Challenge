"use strict"
import React from 'react';
import {Form, FormGroup, Col, FormControl, Button, ControlLabel, Panel, Well, Row} from 'react-bootstrap';
import {findDOMNode} from 'react-dom';
import {ConnectUser} from '../../actions/userActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';

class Signin extends React.Component {

    // handle login user 
    handleSignin(){
        const signinForm ={
            email:findDOMNode(this.refs.email).value,
            password:findDOMNode(this.refs.password).value
        };
       this.props.ConnectUser(signinForm);
    }

    // Redirect to shops component after login return success msg
    componentDidUpdate(){
        if(this.props.user.message == "success") browserHistory.push('/shops');
    }

    render() {
      return ( 
        <Well>
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={3}>
                    Email
          </Col>
                <Col sm={5}>
                    <FormControl type="email" ref="email" placeholder="Email" />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={3}>
                    Password
                </Col>
                <Col sm={5}>
                    <FormControl type="password" ref="password" placeholder="Password" />
                </Col>

            </FormGroup>

            <FormGroup>
                <Col smOffset={3} sm={5}>
                    <Button bsStyle="success" onClick={this.handleSignin.bind(this)}>Sign in</Button>
                </Col>
            </FormGroup>
            <FormGroup>
                <Col smOffset={3} sm={6}>
                    Still don't have an account?you can <a href="/register" >Register here</a>.
                </Col>
            </FormGroup>
        </Form>
          
        </Well>
      )
    }
}

function mapStateToProps(state){
    return {
        user : state.user.user
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ConnectUser},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Signin);