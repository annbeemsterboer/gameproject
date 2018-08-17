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

export const seaAudio = new Audio(seaSound)
const frogAudio = new Audio(frogSound)
const fishAudio = new Audio(fishSound)

const StyledModalForPoints = styled.div``
class Board extends PureComponent {
  makeMove = (rowIndex, columnIndex, isSharkBeaten) => {
    console.log(rowIndex, isSharkBeaten)

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
      // case 'octopus':
      //   return octopusAudio.play()
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

  componentWillMount() {
    seaAudio.play()
  }

  componentWillUnmount() {
    this.stopSeaSound()
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
          <img src={SharkChase} />
        </div>
      )
    }

    if (currentGame.turn === currentPlayer.id && currentGame.character) {
      this.playSound(currentGame.character)
    }

    return (
      <div>
        {currentGame.character === 'shark' ? (
          <Shark
            makeMove={this.makeMove}
            position={currentGame.previousPosition}
          />
        ) : null}

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
