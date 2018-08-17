import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import ink from './assets/img/ink4.png'

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`

const OctopusModal = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9000;
  padding: 0;
  margin: 0;
`

const StyledInk = styled.div`
  background-image: url(${ink});
  background-size: 100%;
  position: absolute;
  top: 50px;
  left: 210px;
  animation: ${fadeInOut} 3.5s forwards;
  width: 900px;
  height: 800px;
`

class Octopus extends Component {
  render() {
    return (
      <OctopusModal>
        <StyledInk />
      </OctopusModal>
    )
  }
}

export default Octopus
