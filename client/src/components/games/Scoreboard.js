import React from 'react'
import './Board.css'

const scoreBoard = props => {
  // console.log(props.game)
  return (
    <div className="scoreboard">
      <h1 className="header">Who will be the king-fisher?</h1>
      <div className="players">
        <h1> The fishers: </h1>
        <table>
          {props.game.players.map(player => {
            const p = Object.values(props.users).find((plyr, i) => {
              return player.userId === plyr.id
            })

            return (
              <p>
                {p.firstName} Points: {player.point}
              </p>
            )
          })}
        </table>
      </div>
    </div>
  )
}

export default scoreBoard
