import React, { Component } from 'react'
import shark from './assets/img/shark.jpg'
import styled, { keyframes } from 'styled-components'
import jaws from './assets/audio/Jaws-song-speed.mp3'

const sharkAudio = new Audio(jaws)

const iconSize = 70

const posAbs = ` 
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`

const letterAnimation = keyframes`
  from{
    font-size: 200px;
    opacity: 1;
  }
  to{
    font-size: 130px;
    opacity: 0;
  }
`

const slideFadeIn = keyframes`
  from{
    opacity:0;
    transform: rotate(-45deg)
  }
  to{
    opacity: 1;
    transform: rotate(675deg)
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

const ResultMessage = styled.h1`
  ${posAbs};
  height: 1em;
  font-size: 200px;
  animation: ${slideFadeIn} 0.5s ease-in-out forwards;
`

const SharkModal = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(255, 0, 0, 0.8);
  position: fixed;
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
    ${posAbs};
    width: 50px;
    height: 1em;
    animation: ${letterAnimation} 1s linear 7;
  }
`

class Shark extends Component {
  state = {
    count: 5,
    position: {
      top: window.innerHeight / 4,
      left: window.innerWidth / 4
    },
    timer: 5,
    isBeaten: null
  }

  makeMove = () => {
    if (this.state.isBeaten === null) return

    this.props.makeMove(
      this.props.position.rowIndex,
      this.props.position.columnIndex,
      this.state.isBeaten
    )
  }

  playAudio = () => {
    sharkAudio.play()
  }

  stopAudio = () => {
    sharkAudio.pause()
  }

  componentDidMount() {
    this.playAudio()

    setTimeout(() => {
      if (this.state.count > 0 && !this.state.isBeaten) {
        this.setState({ message: 'LOSE!', isBeaten: false })
      }
    }, this.state.timer * 1000)

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

  componentWillUnmount() {
    this.stopAudio()
  }

  generateSharkPosition = () => {
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
          this.setState({ message: 'WIN!', isBeaten: true })
          clearTimeout()
        }
      }
    )
  }
  render() {
    let messageAndTimer
    if (!this.state.message) {
      messageAndTimer = (
        <div>
          <h1>Click the Shark {this.state.count} Times!</h1>
          <h2 className="timer">{this.state.timer}</h2>
        </div>
      )
    }
    return (
      <SharkModal onClick={this.makeMove}>
        {/* {this.state.message ? (
          
        ) : null}
        {this.state.message ? (
          <ResultMessage>{this.state.message}</ResultMessage>
        ) : null}
        <h2 className="timer">
          {this.state.timer !== 0 ? this.state.timer : null}
        </h2> */}

        {messageAndTimer}

        {this.state.isBeaten !== null ? (
          <ResultMessage>{this.state.message}</ResultMessage>
        ) : null}
        {this.state.isBeaten === null ? (
          <StyledShark
            position={this.state.position}
            onClick={this.generateSharkPosition}
          />
        ) : null}
      </SharkModal>
    )
  }
}

export default Shark
