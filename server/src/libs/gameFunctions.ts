import { boardSetting } from '../games/gameSettings'

const { gridSize, o, y, z } = boardSetting
const specialSymbols = [o, y, z]

const shuffleArray = targetArr => {
  const arr = [...targetArr]
  arr.forEach((_, i) => {
    const random = Math.floor(Math.random() * arr.length)
    ;[arr[i], arr[random]] = [arr[random], arr[i]]
  })
  return arr
}

const getArrayFilledWithSymbols = () => {
  return specialSymbols
    .map(symbol => Array(symbol.amount).fill(symbol.symbol))
    .reduce((arr, symbolsArr) => arr.concat(symbolsArr))
}

export const getRandomBoard = () => {
  // const specialCharArr = Array(o.symbol)
  //   .fill(o.symbol)
  //   .concat(Array(y.symbol).fill(y.symbol), Array(z.symbol).fill(z.symbol))
  const specialCharArr = getArrayFilledWithSymbols()
  const defaultArr = Array(gridSize * gridSize)
    .fill('x')
    .slice(0, -specialCharArr.length)
    .concat(specialCharArr)

  const shuffledArr = shuffleArray(defaultArr)
  console.log(shuffledArr)

  return [...Array(gridSize)].map((_, i) => {
    return shuffledArr.splice(0, gridSize)
  })
}

export const getEmptyBoard = () =>
  [...Array(boardSetting.gridSize)].map(() => {
    return Array(boardSetting.gridSize).fill(null)
  })
