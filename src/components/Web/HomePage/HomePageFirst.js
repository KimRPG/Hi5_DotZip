import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Div = styled.div`
  margin-top: 70px;
  height: 1000px;
`;

const HomeFirst = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('../../../../SurveyFirst'); // Replace with the actual path you want to navigate to
  };
  const handleButton1Click = () => {
    navigate('../../../../SurveyCreate'); // Replace with the actual path you want to navigate to
  };

  return (
    <>
      <Div>홈 첫번째 페이지</Div>
      <button onClick={handleButtonClick}>Survey</button>
      <button onClick={handleButton1Click}>SurveyCreate</button>
    </>
  );
};

export default HomeFirst;
