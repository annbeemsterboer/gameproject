import React, { PureComponent } from 'react'
import { getGames, createGame } from '../../actions/games'
import { getUsers } from '../../actions/users'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import './GamesList.css'

class GamesList extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.games === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  renderGame = game => {
    const { users, history } = this.props

    return (
      <Card key={game.id} className="game-card">
        <CardContent>
          <Typography color="textSecondary">
            This game is played by&nbsp;
            {game.players
              .map(player => {
                // console.log(game)
                // console.log(users)
                // console.log(player)
                // return users[player.id].firstName
              })
              .join(' and ')}
          </Typography>
          <Typography variant="headline" component="h2">
            Game #{game.id}
          </Typography>
          <Typography color="textSecondary">Status: {game.status}</Typography>
        </CardContent>
        <CardActions>
          <Button
            style={{ backgroundColor: '#d6e3e0' }}
            size="small"
            onClick={() => history.push(`/games/${game.id}`)}
          >
            Watch
          </Button>
        </CardActions>
      </Card>
    )
  }

  render() {
    const { games, users, authenticated, createGame } = this.props

    if (!authenticated) return <Redirect to="/login" />

    if (users === null) return null

    return (
      <Paper className="outer-paper" style={{ font: 'Inconsolata' }}>
        <Button
          style={{ backgroundColor: '#d6e3e0' }}
          variant="raised"
          onClick={createGame}
          className="create-game"
        >
          Create Game
        </Button>

        <div>{games !== null && games.map(game => this.renderGame(game))}</div>
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  games:
    state.games === null
      ? null
      : Object.values(state.games).sort((a, b) => b.id - a.id)
})

export default connect(
  mapStateToProps,
  { getGames, getUsers, createGame }
)(GamesList)
