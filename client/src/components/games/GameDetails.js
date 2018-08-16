import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getGames, joinGame } from '../../actions/games'
import { getUsers } from '../../actions/users'
import { userId as getUserId } from '../../jwt'
import Board from './Board'
import InfoModal from './InfoModal'
import Scoreboard from './Scoreboard'
import './GameDetails.css'

class GameDetails extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.currentGame === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  joinGame = () => this.props.joinGame(this.props.match.params.id)

  render() {
    const {
      currentGame,
      users,
      authenticated,
      currentUserId,
      currentPlayer
    } = this.props
    if (!authenticated) return <Redirect to="/login" />
    if (!currentGame) return <Redirect to="/games" />

    if (currentGame === null || users === null) return 'Loading...'
    if (!currentGame) return 'Not found'

    return (
      <div className="body">
        <h1>Game #{currentGame.id}</h1>

        <p>Status: {currentGame.status}</p>

        {currentGame.status === 'started' &&
          currentPlayer &&
          currentPlayer.id === currentGame.turn && <div>It's your turn!</div>}

        {currentGame.status === 'pending' &&
          currentGame.players.map(p => p.userId).indexOf(currentUserId) ===
            -1 && (
            <button
              style={{ backgroundColor: '#d6e3e0' }}
              onClick={this.joinGame}
            >
              Join Game
            </button>
          )}

        {/* {currentGame.winner && <p>Winner: {users[winner].firstName}</p>} */}
        <InfoModal />
        <hr />
        <div className="page">
          {currentGame.status !== 'pending' && (
            <Board
              currentGameId={this.props.match.params.id}
              currentUserId={currentUserId}
              currentGame={currentGame}
              currentPlayer={currentPlayer}
            />
          )}
          {currentGame.status !== 'pending' && (
            <Scoreboard
              game={this.props.currentGame}
              users={this.props.users}
            />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const currentUserId = state.currentUser && getUserId(state.currentUser.jwt)
  const currentGame = state.games && state.games[props.match.params.id]
  return {
    /// userd to fetch data when reloaded!
    authenticated: state.currentUser !== null,
    currentUserId,
    users: state.users,
    ////////////
    currentGame,
    currentPlayers: currentGame && currentGame.players,
    currentPlayer:
      currentGame && currentGame.players.find(p => p.userId === currentUserId)
  }
}

const mapDispatchToProps = {
  getGames,
  getUsers,
  joinGame
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameDetails)
