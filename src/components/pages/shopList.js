"use strict"
import React from 'react';
import {connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {GetShops} from '../../actions/shopsActions';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import ShopItem from './shopItem';


class ShopsList extends React.Component{
    constructor(){
        super();
    }
    componentDidMount(){
        //Dispatche get
        this.props.GetShops();
    }
    render(){
        const shopsList = this.props.shops.map(function(shopsArr){
            return (
                <Col xs={12} sm={6} md={4} key={shopsArr._id}>
                    <ShopItem
                        _id={shopsArr._id}
                        picture={shopsArr.picture}
                        name={shopsArr.name}
                        email={shopsArr.email}                  
                        city={shopsArr.city}
                    />
                </Col>
            )
        });
       
        return(
                <Grid >       
               
                    <Row style={{marginTop:'15px'}} >
                    <div id="parentComp"></div>
                       
                         {shopsList}
                     </Row>
                </Grid>
          
        )  
    }
}
function mapStateToProps(state){
    
    return {
        shops: state.shops.shops
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({GetShops},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ShopsList);