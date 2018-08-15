import React, { PureComponent } from 'react'
import './Board.css'
import { connect } from 'react-redux'
import { sendMoveInfo } from '../../actions/games'
import './GameDetails.css'

import seaweed from './assets/img/seaweed.png'
import normalFish from './assets/img/normalfish.png'
import sea from './assets/img/sea.png'
import squid from './assets/img/squid.png'
import shark from './assets/img/shark.jpg'

const generateImageUrl = item => {
  switch (item) {
    case null:
      return sea

    case '-':
      return seaweed
    case 'O':
      return squid
    case 'Y':
      return normalFish
    case 'Z':
      return shark
  }
}

class Board extends PureComponent {
  makeMove = (rowIndex, columnIndex, playerId) => {
    console.log(rowIndex, columnIndex, playerId)
    this.props.sendMoveInfo(
      {
        rowIndex,
        columnIndex,
        jwt: playerId
      },
      this.props.currentGameId
    )
  }

  render() {
    const { currentGameId } = this.props
    const currentGame = this.props.currentGame

    if (!currentGame.board) return 'fetching..'

    return (
      <div className="buttonPad">
        {currentGame.board.map((row, rowI) => {
          return (
            <div key={rowI} className="buttonRow">
              {row.map((column, columnI) => {
                return (
                  <span key={columnI}>
                    <button
                      className="button"
                      disabled={this.props.turn !== currentGameId}
                      onClick={() =>
                        this.makeMove(rowI, columnI, this.props.turn)
                      }
                      style={{
                        backgroundImage: `url(${generateImageUrl(column)}`
                      }}
                    />
                  </span>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    currentUser: state.currentUser,
    currentGame: state.games[props.currentGameId],
    turn: state.games.turn
    // games: state.games
  }
}

export default connect(
  mapStateToProps,
  { sendMoveInfo }
)(Board)
