import { boardSetting, specialSymbols } from '../games/gameSettings'
import { Player } from '../games/entities'

const { gridSize } = boardSetting
const { seaweed, octopus, fish, shark, frog } = boardSetting.characters
const specialSymbol = [octopus, fish, shark, frog]

const shuffleArray = targetArr => {
  const arr = [...targetArr]
  arr.forEach((_, i) => {
    const random = Math.floor(Math.random() * arr.length)
    ;[arr[i], arr[random]] = [arr[random], arr[i]]
  })
  return arr
}

const getArrayFilledWithSymbols = () => {
  return specialSymbol
    .map(symbol => Array(symbol.amount).fill(symbol.symbol))
    .reduce((arr, symbolsArr) => arr.concat(symbolsArr))
}

export const getRandomBoard = () => {
  // const specialCharArr = Array(o.symbol)
  //   .fill(o.symbol)
  //   .concat(Array(y.symbol).fill(y.symbol), Array(z.symbol).fill(z.symbol))
  const specialCharArr = getArrayFilledWithSymbols()
  const defaultArr = Array(gridSize * gridSize)
    .fill(seaweed.symbol)
    .slice(0, -specialCharArr.length)
    .concat(specialCharArr)

  const shuffledArr = shuffleArray(defaultArr)

  return [...Array(gridSize)].map(() => {
    return shuffledArr.splice(0, gridSize)
  })
}

export const getEmptyBoard = () =>
  [...Array(boardSetting.gridSize)].map(() => {
    return Array(boardSetting.gridSize).fill(null)
  })

export const calculatePoints = (
  character: specialSymbols,
  isSharkBeaten: boolean
): number => {
  console.log(character, boardSetting.characters[character].point)
  if (character === 'shark' && isSharkBeaten === false) {
    return -boardSetting.characters[character].point
  }
  return boardSetting.characters[character].point
}

export const addPointInfoToCharacters = characters =>
  characters.map(character => {
    const name = character.name
    const point = boardSetting.characters[name].point
    character.point = point
    return character
  })
