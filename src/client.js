"use strict"
//Import React 
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware,createStore} from 'redux';
import thunk from 'redux-thunk';
//Import Router
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
//Import combined reducers 
import reducers from './reducers/index';
import Profile from './components/pages/profile';
import ShopList from './components/pages/shopList';
import Signin from './components/pages/signin';
import Register from './components/pages/register';
import Main from './main';



// Middlewares
const Middlewares = applyMiddleware(thunk);
// Creating the store with Middlewares
const store = createStore(reducers,Middlewares);

const Routes =  (
    <Provider store={store} >
        <Router history={browserHistory}>
            <Route path='/' component={Main}>
                <IndexRoute  component={Signin}/>
                <Route path='/profile' component={Profile}/>
                <Route path='/register' component={Register} />
                <Route path='/shops' component={ShopList}/>
                <Route path='/' component={Signin} />
                <Route path='/' component={Signin} />
            </Route>
        </Router>
   </Provider>
)

render (
    Routes
    ,document.getElementById('app')
);
//Showing the current state in console 
store.subscribe(function(){
    console.log('current state is :', store.getState());

});