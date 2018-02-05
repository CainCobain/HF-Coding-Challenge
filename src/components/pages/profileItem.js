"use strict"
import React from 'react';
import {Image, Row, Col, Grid, Button, Well } from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RemoveShop} from '../../actions/userShopActions';

class UserShopItem extends React.Component{

    constructor(){
        super();
        this.handleShop = this.handleShop.bind(this);
    
    }
  
    handleShop(){
        this.props.RemoveShop(this.props._id);
    }
    render(){
        return(
                <Well>
                    <Row >
                        <Col xs={12} sm={4}>
                        <Image src={this.props.picture} responsive/>
                        </Col>
                        <Col xs={6} sm={8}>
                            <h5>{this.props.name}</h5>
                            <h6>{this.props.email}</h6> 
                            <p>{this.props.city}</p>
                            <Button onClick={this.handleShop} bsStyle="danger">Remove</Button>
                        </Col>
                    </Row>
                </Well>
        )
    }
}
function mapStateToProps(state){
    return {
        shop: state.liked.liked
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({RemoveShop},dispatch);
}
export default connect(mapStateToProps ,mapDispatchToProps)(UserShopItem);