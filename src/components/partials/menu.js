"use strict"
import React from 'react';
import {Nav, Navbar, NavItem, Badge}from 'react-bootstrap';

class Menu extends React.Component{
    render()
   { 
       return  (
        <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/shops">HF</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            
          </Nav>
          <Nav pullRight>
           <NavItem eventKey={1} href="/shops">
              Shops
            </NavItem>
            <NavItem eventKey={2} href="/profile">
              Liked Shops
            </NavItem>
            <NavItem eventKey={3} href="/">
              Logout
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>)
      }

}

export default Menu ;