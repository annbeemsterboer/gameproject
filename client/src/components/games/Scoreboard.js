import React from 'react'
import './Board.css'

const scoreBoard = props => {
  console.log(props)
  return (
    <div className="scoreboard">
      <h1 className="header">Who is the king-fisher?</h1>
      <div className="players">
        The fishers:
        {props.players}
      </div>
    </div>
  )
}

export default scoreBoard
