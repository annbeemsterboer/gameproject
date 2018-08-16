import React, { Component } from 'react'
import shark from './assets/img/shark.jpg'
import styled, { keyframes } from 'styled-components'

const iconSize = 100

const letterAnimation = keyframes`
  from{
    font-size: 200px
    opacity: 1
  }
  to{
    font-size: 170px
    opacity: 0
  }
`
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
  h1 {
    color: white;
    text-align: center;
  }
  .timer {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 50px;
    height: 50px;
    animation: ${letterAnimation} 1s linear 7;
  }
`

class Shark extends Component {
  state = {
    show: false,
    started: false,
    count: 3,
    position: {
      top: window.innerHeight / 4,
      left: window.innerWidth / 4
    },
    timer: 5
  }
  componentDidMount() {
    this.setState({ started: true })
    setTimeout(() => {
      if (this.state.count > 0) {
        this.setState({ message: 'lose!', started: false })
      }
    }, 5000)
    const timer = setInterval(() => {
      this.setState(
        ({ timer }) => ({
          timer: timer - 1
        }),
        () => {
          if (this.state.timer === 0) clearInterval(timer)
        }
      )
    }, 1000)
  }

  generateSharkPosition = () => {
    // if (!this.state.started) return

    const randomX = Math.floor(Math.random() * window.innerWidth - iconSize)

    // need to change it
    const randomY =
      Math.floor(Math.random() * window.innerHeight - iconSize - 200) + 200

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
    return (
      <SharkModal>
        <h1>Click the Shark!</h1>
        <h2 className="timer">
          {this.state.timer !== 0 ? this.state.timer : null}
        </h2>

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
