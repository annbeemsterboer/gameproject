import seaweed from '../assets/img/seaweed.png'
import fish from '../assets/img/normalfish.png'
import sea from '../assets/img/sea.png'
import octopus from '../assets/img/squid.png'
import shark from '../assets/img/shark.jpg'

const generateImageUrl = item => {
  switch (item) {
    case 'seaweed':
      return seaweed
    case 'octopus':
      return octopus
    case 'fish':
      return fish
    case 'shark':
      return shark
    default:
      return sea
  }
}

export default generateImageUrl
