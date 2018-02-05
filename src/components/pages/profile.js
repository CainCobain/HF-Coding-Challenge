"use strict"
import React from 'react';
import {connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import ShopItem from './shopItem';
import UserShopItem from './profileItem';
import {GetLikedShops} from '../../actions/userShopActions';

class Profile extends React.Component{
    
    componentDidMount(){
        //Dispatche get
        this.props.GetLikedShops();
    }
    
    render(){
       
        const shopsList = this.props.shope.map(function(shopsArr){
        
            return (
                <Col xs={12} sm={6} md={4} key={shopsArr._id}>
                    <UserShopItem 
                       _id={shopsArr._id}
                        picture={shopsArr.shop.picture}
                        name={shopsArr.shop.name}
                        email={shopsArr.shop.email}                  
                        city={shopsArr.shop.city}
                    />
                </Col>
            )
        });
        return(
                <Grid>       

                    <Row style={{marginTop:'15px'}}>
                         {shopsList}
                     </Row>
                </Grid>
          
        )
    }

}
function mapStateToProps(state){
    return {
        shope: state.liked.liked
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({GetLikedShops},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);