import React from 'react'

const board = [[null, 'o', null], [null, 'x', null], [null, null, null]]

const TestBoard = props => {
  return board.map((row, i) => {
    return (
      <div>
        {row.map((column, ci) => {
          return <span>{column || 'null'},</span>
        })}
      </div>
    )
  })
}

export default TestBoard
