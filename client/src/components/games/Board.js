import React, { PureComponent } from 'react'
import './Board.css'
import { connect } from 'react-redux'
import { sendMoveInfo } from '../../actions/games'
import './GameDetails.css'

const defaultbord = [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null]
]

class Board extends PureComponent {
  makeMove = (rowIndex, columnIndex, playerId) => {
    this.props.sendMoveInfo(
      {
        rowIndex,
        columnIndex,
        jwt: playerId
      },
      this.props.gameId
    )
  }

  render() {
    const game = this.props.game[this.props.gameId]
    console.log(game)

    return (
      <div className="buttonPad">
        {defaultbord.map((row, rowI) => {
          return (
            <div className="buttonRow" key={rowI}>
              {row.map((column, columnI) => {
                return (
                  <span key={columnI}>
                    <button
                      className="button"
                      disabled={this.props.turn !== this.props.currentUser.id}
                      onClick={() =>
                        this.makeMove(rowI, columnI, this.props.turn)
                      }
                    >
                      {columnI}
                    </button>
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

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    currentGame: state.currentGame,
    turn: state.games.turn,
    game: state.games
  }
}

export default connect(
  mapStateToProps,
  { sendMoveInfo }
)(Board)
