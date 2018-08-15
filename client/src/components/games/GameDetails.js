import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getGames, joinGame } from '../../actions/games'
import { getUsers } from '../../actions/users'
import { userId } from '../../jwt'
import Board from './Board'
import ScoreBoard from './ScoreBoard'
import './GameDetails.css'

class GameDetails extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  // makeMove = (toRow, toCell) => {
  //   const {game, updateGame} = this.props

  //   const board = game.board.map(
  //     (row, rowIndex) => row.map((cell, cellIndex) => {
  //       if (rowIndex === toRow && cellIndex === toCell) return game.turn
  //       else return cell
  //     })
  //   )
  //   updateGame(game.id, board)
  // }

  render() {
    const { game, users, authenticated, userId } = this.props

    if (!authenticated) return <Redirect to="/login" />

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId === userId)

    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0]

    return (
      <div>
        <h1>Game #{game.id}</h1>

        <p>Status: {game.status}</p>

        {game.status === 'started' &&
          player &&
          player.id === game.turn && <div>It's your turn!</div>}

        {game.status === 'pending' &&
          game.players.map(p => p.userId).indexOf(userId) === -1 && (
            <button onClick={this.joinGame}>Join Game</button>
          )}

        {winner && <p>Winner: {users[winner].firstName}</p>}

        <hr />
        <div className="page">
          {game.status !== 'pending' && (

            <Board currentGameId={this.props.match.params.id} />

          )}
          {game.status !== 'pending' && <ScoreBoard game={this.props.game} />}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users,
  players: state.games && state.games[props.match.params.id].players
})

const mapDispatchToProps = {
  getGames,
  getUsers,
  joinGame
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameDetails)
