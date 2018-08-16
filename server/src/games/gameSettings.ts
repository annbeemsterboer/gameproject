// type specialSymbols = {
//   amount: number
//   symbol: 'O' | 'Y' | 'Z'
//   point: number
// }
export type specialSymbols = 'seaweed' | 'octopus' | 'fish' | 'shark'

export const boardSetting = {
  gridSize: 5,
  characters: {
    seaweed: {
      amount: 0,
      symbol: 'seaweed',
      point: 0
    },
    octopus: {
      amount: 3,
      symbol: 'octopus',
      point: -10
    },
    fish: {
      amount: 3,
      symbol: 'fish',
      point: 10
    },
    shark: {
      amount: 2,
      symbol: 'shark',
      point: 20
    }
  }
}
