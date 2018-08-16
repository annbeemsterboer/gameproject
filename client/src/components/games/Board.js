import React, { PureComponent } from 'react'
import './Board.css'
import { connect } from 'react-redux'
import { sendMoveInfo } from '../../actions/games'
import './GameDetails.css'
import InfoModal from './InfoModal'
import seaweed from './assets/img/seaweed.png'
import fish from './assets/img/normalfish.png'
import sea from './assets/img/sea.png'
import octopus from './assets/img/squid.png'
import shark from './assets/img/shark.jpg'

const generateImageUrl = item => {
  switch (item) {
    case 'seaweed':
      return seaweed
    case 'octopus':
      return octopus
    case 'fish':
      return fish
    case 'shark':
      return shark
    default:
      return sea
  }
}

class Board extends PureComponent {
  makeMove = (rowIndex, columnIndex, gameId) => {
    this.props.sendMoveInfo(
      {
        rowIndex,
        columnIndex
      },
      gameId
    )
  }

  render() {
    const { currentGame, currentPlayer } = this.props

    // console.log('turn', currentGame.turn)
    // console.log('currentPlayer', currentPlayer)

    if (!currentGame.board) return 'fetching..'

    return (
      <div>
        <div className="buttonPad">
          {currentGame.board.map((row, rowI) => {
            return (
              <div key={rowI} className="buttonRow">
                {row.map((column, columnI) => {
                  return (
                    <button
                      className="button"
                      key={columnI}
                      disabled={
                        currentGame.turn !== currentPlayer.id || column !== null
                      }
                      onClick={() =>
                        this.makeMove(rowI, columnI, currentGame.id)
                      }
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
        {/* <InfoModal /> */}
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
