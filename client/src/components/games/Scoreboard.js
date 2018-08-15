import React from 'react'
import './Board.css'


const Scoreboard = props => {

  // console.log(props.game)
  return (
    <div className="scoreboard">
      <h1 className="header">Who will be the king-fisher?</h1>
      <div className="players">
        <h1> The fishers: </h1>


        {props.game.players.map(player => {
          const p = Object.values(props.users).find((plyr, i) => {
            return player.userId === plyr.id
          })

          return (
            <div className="player" key={player.userId}>
              <div className="name">{p.firstName}</div>
              <div className="score">{player.point}</div>
            </div>
          )
        })}

      </div>
    </div>
  )
}

export default Scoreboard

