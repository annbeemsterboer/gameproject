import React, { Component } from 'react'
import shark from './assets/img/shark.jpg'
import styled from 'styled-components'

const iconSize = 100

const StyledShark = styled.div`
  width: ${iconSize}px;
  height: ${iconSize}px;
  position: absolute;
  top: ${({ position }) => position.top}px;
  left: ${({ position }) => position.left}px;
  transition: 0.3s;
  background-image: url(${shark});
  background-size: cover;
`

const SharkModal = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: rgb(255, 0, 0, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9000;
  padding: 0;
  margin: 0;
`

class Shark extends Component {
  state = {
    show: false,
    started: false,
    count: 3,
    position: {
      top: 10,
      left: 0
    },
    windowSizeX: window.innerWidth,
    windowSizeY: window.innerHeight
  }
  componentDidMount() {
    this.setState({ started: true })
    setTimeout(() => {
      if (this.state.count > 0) {
        this.setState({ message: 'lose!', started: false })
      }
    }, 5000)
  }

  generateSharkPosition = () => {
    if (!this.state.started) return

    const randomX = Math.floor(Math.random() * window.innerWidth - iconSize)

    const randomY =
      Math.floor(Math.random() * window.innerHeight - iconSize - iconSize / 2) +
      iconSize / 2

    this.setState(
      ({ count }) => ({
        position: {
          top: randomY,
          left: randomX
        },
        count: count - 1
      }),
      () => {
        if (this.state.count === 0) {
          this.setState({ message: 'win!', started: false })
          clearTimeout()
        }
      }
    )
  }
  render() {
    if (this.props.show !== true) return null
    return (
      <SharkModal>
        <StyledShark
          position={this.state.position}
          onClick={this.generateSharkPosition}
        >
          {this.state.count}
          {this.state.message}
          <br />
          {this.state.windowSizeX}
          <br />

          {this.state.windowSizeY}
        </StyledShark>
      </SharkModal>
    )
  }
}

export default Shark
