"use strict"
import React from 'react';
import Menu from './components/partials/menu';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Main extends React.Component{
    render(){
        return(
            <div>
               {(this.props.location.pathname == "/" || this.props.location.pathname == "/register" )? '' : <Menu />}  
                     <strong> </strong>
                    {this.props.children} 
            </div>
        );
    }
}

export default Main;