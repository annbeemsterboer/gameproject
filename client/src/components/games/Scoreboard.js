import React from 'react'
import './Board.css'
import generateImageUrl from './libs/generateImageUrl'
import styled from 'styled-components'

const StyledImgContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2em;
  & img {
    width: 50px;
    height: 50px;
    margin: 0 10px;
  }
`

const Scoreboard = props => {
  let winnerName
  if (props.game.winner === 'draw') {
    winnerName = 'draw'
  } else if (props.game.winner) {
    const game = props.game
    const winnerId = Number(game.winner)
    // console.log(winnerId)
    const winnerUserId = game.players.find(p => p.id === winnerId).userId
    winnerName = props.users[winnerUserId].firstName
  }

  return (
    <div className="scoreboard">
      <h1 className="header"> Who will be the king-fisher?</h1>
      {props.game.winner !== null && `The king is ${winnerName}!`}
      <div className="players">
        <h1> The fishers: </h1>

        {props.game.players.sort((a, b) => a.id - b.id).map(player => {
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

        <StyledImgContainer>
          {props.game.characters.map(character => {
            return (
              <div key={character.id}>
                <img src={generateImageUrl(character.name)} />:{' '}
                {character.count}
              </div>
            )
          })}
        </StyledImgContainer>
      </div>
    </div>
  )
}

export default Scoreboard
