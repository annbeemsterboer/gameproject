import React, { PureComponent } from 'react'
import './Board.css'
import { connect } from 'react-redux'
import { sendMoveInfo } from '../../actions/games'
import './GameDetails.css'
import generateImageUrl from './libs/generateImageUrl'
import SharkChase from './assets/img/SharkChase.png'
import Shark from './Shark'
import seaSound from './assets/audio/Sea-noises.mp3'
import frogSound from './assets/audio/frog.mp3'
import fishSound from './assets/audio/fish.wav'
import InkSound from './assets/audio/ink.wav'
import PointsModal from './PointsModal'
import Octopus from './Octopus'

export const seaAudio = new Audio(seaSound)
const frogAudio = new Audio(frogSound)
const fishAudio = new Audio(fishSound)
const inkAudio = new Audio(InkSound)

class Board extends PureComponent {
  state = {
    showPoints: true,
    showOctopus: false
  }

  makeMove = (rowIndex, columnIndex, isSharkBeaten) => {
    this.props.sendMoveInfo(
      {
        rowIndex,
        columnIndex
      },
      this.props.currentGameId,
      isSharkBeaten
    )
  }

  playSound = character => {
    switch (character) {
      case 'frog':
        return frogAudio.play()
      case 'fish':
        return fishAudio.play()
      case 'octopus':
        return inkAudio.play()
      case 'shark':
        return this.stopSeaSound()
      default:
        return seaAudio.play()
    }
  }

  stopSeaSound = () => {
    seaAudio.pause()
  }

  componentDidMount() {
    seaAudio.play()
  }

  componentWillUnmount() {
    this.stopSeaSound()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentGame.turn !== this.props.currentGame.turn) {
      this.setState({ showPoints: true })
      if (this.props.currentGame.character === 'octopus') {
        this.setState({ showOctopus: true })
      }
    }
    setTimeout(() => {
      this.setState({ showPoints: false, showOctopus: false })
    }, 3500)
  }

  render() {
    const { currentGame, currentPlayer } = this.props

    if (!currentGame.board) return 'fetching..'

    if (
      currentGame.turn !== currentPlayer.id &&
      currentGame.character === 'shark'
    ) {
      return (
        <div>
          <p>YOUR OPPONENT IS BEING CHASED BY A SHARK!</p>
          <img src={SharkChase} alt="shark" />
        </div>
      )
    }

    if (currentGame.turn !== currentPlayer.id && currentGame.character) {
      this.playSound(currentGame.character)
    }

    return (
      <div>
        {currentGame.pointAdded !== undefined &&
        currentGame.turn !== currentPlayer.id &&
        this.state.showPoints ? (
          <PointsModal point={currentGame.pointAdded} />
        ) : null}
        {currentGame.character === 'shark' ? (
          <Shark
            makeMove={this.makeMove}
            position={currentGame.previousPosition}
          />
        ) : null}
        {this.state.showOctopus && <Octopus />}

        <div className="buttonPad">
          {currentGame.board.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className="buttonRow">
                {row.map((column, columenIndex) => {
                  return (
                    <button
                      className="button"
                      key={columenIndex}
                      disabled={
                        currentGame.turn !== currentPlayer.id || column !== null
                      }
                      onClick={() => this.makeMove(rowIndex, columenIndex)}
                      style={{
                        backgroundImage: `url(${generateImageUrl(column)}`
                      }}
                    />
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    currentGame: state.games[props.currentGameId]
  }
}

export default connect(
  mapStateToProps,
  { sendMoveInfo }
)(Board)
