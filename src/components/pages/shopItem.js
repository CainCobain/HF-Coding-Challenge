"use strict"
import React from 'react';
import {Image, Row, Col, Grid, Button, Well } from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {LikeShop,RemoveShop,RerenderShop} from '../../actions/userShopActions';
import axios from 'axios';
import ReactDOM from 'react-dom';

let DislikeArr = [];
let toRenderArr = [];
  
// Initialize the Dislise array with disliked shops saved in the database 
(function (){
    axios.get("/api/dislikedShop")
    .then((response)=>{
    if(response.data.length > 0){
        response.data.map((dislikedShop,i) => {   
         DislikeArr.push(dislikedShop);
        })
    }
    })
    .catch((err)=>{
        console.log("there was an error while geting disliked shops");
    })
})();

class ShopItem extends React.Component{

    constructor(){
        super();
        this.handleLike = this.handleLike.bind(this);
        this.handleDislike = this.handleDislike.bind(this);
       }

 
    //Add liked shops to db and remove it from the parent component
    handleLike(){
       const parentWellElement = document.getElementById(this.props._id).parentElement;
       parentWellElement.remove();
       this.props.LikeShop({shop:this.props._id,user:this.props.session});
    }

    //Add diliked shops to db and remmove it from the parent component
    handleDislike(){
        var currentDate = new Date();
        //Hide it for 2hours 
        var twoHoursLater = new Date(currentDate.getTime() + (120 * 60 * 1000));
        const parentWellElement = document.getElementById(this.props._id).parentElement;
        parentWellElement.remove();
        const dislikedElem= ({shop:
            {   _id:this.props._id,
                picture:this.props.picture,
                name:this.props.name,
                email:this.props.email,
                city:this.props.city},
                timeup:twoHoursLater.toISOString(),
                user:this.props.session,
                liked:false
            })
        //Add disliked shop to Dislike array 
        DislikeArr.push(dislikedElem);        
       //Dislike with the false status in liked field 
        this.props.LikeShop({shop:this.props._id,liked:false,user:this.props.session});
    }
    //Setting interval to test if Disliked shops time is up     
    Exec = setInterval(
        ()=>{
            //Converting Dates to the same format 
            const currentDate = new Date();
            const currentDateISO = Date.parse(currentDate.toISOString());
            
            
            //Test if there is Disliked shops in the Dislike array
            if(DislikeArr.length>0){
                
                DislikeArr.map((gotit,i)=>{
                //Time for every disliked shop in the list of disliked shops
                const timeUpISO = Date.parse(gotit.timeup);
                if(currentDateISO>timeUpISO){
                // Disliked Shop time is up  'Two hours' and need to be re rendered     
                let toRender = (<Col xs={12} sm={6} md={4} >
                        <ShopItem
                            _id={gotit.shop._id}
                            picture={gotit.shop.picture}
                            name={gotit.shop.name}
                            email={gotit.shop.email}                
                            city={gotit.shop.city}
                            session={gotit.user}
                        />
                    </Col>);
                    toRenderArr.push(toRender); 
                    //Remove the disliked shop from the db
                    this.props.RerenderShop(gotit.shop._id);                        
                    ReactDOM.render(toRenderArr, document.getElementById('parentComp'));
                    //Remove the disliked shop from disliked array
                    DislikeArr.splice(i,1);
                }     
            })
            }
            }, 5000);
     
    render(){
        return(
            
                <Well id={this.props._id}>
                       
                    <Row >
                        <Col xs={12} sm={4}>
                        <Image src={this.props.picture} responsive/>
                        </Col>
                        <Col xs={6} sm={8}>
                            <h5>{this.props.name}</h5>
                            <h6>{this.props.email}</h6> 
                            <p>{this.props.city}</p>
                            <p>{this.props.userSession}</p>
                            <Button onClick={this.handleLike} bsStyle="primary">Like</Button>
                            <Button onClick={this.handleDislike} bsStyle="danger">Dislike</Button>
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
    return bindActionCreators({LikeShop,
                               RerenderShop},
                               dispatch);
}
export default connect(mapStateToProps ,mapDispatchToProps)(ShopItem);