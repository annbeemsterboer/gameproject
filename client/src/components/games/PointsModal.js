import React from 'react'
import styled, { keyframes } from 'styled-components'

const fadeAnimation = keyframes`
  0%{
    transform: translateY(1000px);
    opacity: 0;
  }
  40%{
   transform: translateY(-40px);
  }
  50%{
    transform: translateY(0px);
    opacity: 1;
  }
  60%{
     transform: translateY(0px);
      opacity: 1;
  }
  100%{
    transform: translateY(-1000px);
    opacity: 0;
  }
`
const StyledModalForPoints = styled.div`
  font-size: 80px;
  width: 200px;
  height: 200px;
  animation: ${fadeAnimation} 2s ease-in-out forwards;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: ${({ point }) =>
    point === 0 ? 'Cornsilk ' : point > 0 ? 'lightblue' : 'LightCoral '};
  box-shadow: 0px 5px 17px lightgrey;
`
const PointsModal = ({ point }) => {
  return <StyledModalForPoints point={point}>{point}</StyledModalForPoints>
}

export default PointsModal
