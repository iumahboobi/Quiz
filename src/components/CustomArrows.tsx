import React from 'react';
import styled from 'styled-components';
import { CustomArrowProps } from 'react-slick'

const ArrowButton = styled.button`
  background: #5778634e;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  bottom:10px;
  z-index: 1;
`;

const PrevArrow:React.FC<CustomArrowProps> = (props) => (
  <ArrowButton style={{ left: '120px' }} onClick={props.onClick}>
    &#9664; {/* Left arrow */}
  </ArrowButton>
);

const NextArrow:React.FC<CustomArrowProps> = (props) => (
  <ArrowButton style={{ right: '120px' }} onClick={props.onClick}>
    &#9654; {/* Right arrow */}
  </ArrowButton>
);

export { PrevArrow, NextArrow };
