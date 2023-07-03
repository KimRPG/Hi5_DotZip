import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../img/Logo.png'
import styled /*{ ThemeProvider } */ from 'styled-components';
// import { useState, useEffect } from 'react';

const NavBarWrapper = styled.nav`
  height: 70px;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 375px;
  z-index:0;
  background-color: white;
  color: white;
`;

const Setting  = styled.div `
  &::after {        
    content: '세팅'; //이미지
      color:black;
        position: absolute;
        top: 50%;
        right: 24px;
        transform: translateY(-50%);
        cursor: pointer;
    }

`;
const Home  = styled.div `      
  &::after {        
    content: url(${logo}); //이미지
    color:black;
        position: absolute;
        top: 50%;
        left : 24px;
        transform: translateY(-50%);
        cursor: pointer;
    }

`;

const NavBar = () => {
  const navigate = useNavigate();
  const HomeOnClick = () => {
    navigate('/home');
  };
  const onClick = () => {
    navigate('/setting');
  };
    return(
    <NavBarWrapper>

        <Home onClick={HomeOnClick}></Home>
        <Setting onClick={onClick}></Setting>
    </NavBarWrapper>
    );
};


export default NavBar;