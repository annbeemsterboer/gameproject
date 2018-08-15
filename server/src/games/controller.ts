import {
  JsonController,
  Authorized,
  CurrentUser,
  Post,
  Param,
  BadRequestError,
  HttpCode,
  NotFoundError,
  ForbiddenError,
  Get,
  Body,
  Patch
} from 'routing-controllers'
import User from '../users/entity'
import { Game, Player, Board } from './entities'
import { IsBoard, isValidTransition, calculateWinner, finished } from './logic'
import { Validate } from 'class-validator'
import { io } from '../index'
import { calculatePoints } from '../libs/gameFunctions'

class updatedGameData {
  // @Validate(IsBoard, {
  //   message: 'Not a valid board'
  // })
  position: {
    columnIndex: number
    rowIndex: number
  }
}

@JsonController()
export default class GameController {
  @Authorized()
  @Post('/games')
  @HttpCode(201)
  async createGame(@CurrentUser() user: Partial<User>) {
    console.log('post gaems')
    // const entity = await Game.create({
    //   turn: user.id
    // })

    // const player = await Player.create({
    //   game: entity,
    //   user
    // })

    const player = await Player.create({
      user
    }).save()

    const gameEntity = await Game.create({
      turn: player.id
    }).save()

    player.game = gameEntity
    console.log(player)

    await player.save()

    const game = await Game.findOneById(gameEntity.id)

    const { generatedBoard, ...data } = game

    io.emit('action', {
      type: 'ADD_GAME',
      payload: data
    })

    return data
  }

  @Authorized()
  @Post('/games/:id([0-9]+)/players')
  @HttpCode(201)
  async joinGame(
    @CurrentUser() user: Partial<User>,
    @Param('id') gameId: number
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new BadRequestError('Game does not exist')
    if (game.status !== 'pending')
      throw new BadRequestError('Game is already started')

    game.status = 'started'
    await game.save()
    console.log(game)

    const player = await Player.create({
      game,
      user,
      point: 50
    }).save()

    const updatedGame = await Game.findOneById(game.id)

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: updatedGame
    })

    return { game: updatedGame }
  }

  @Authorized()
  // the reason that we're using patch here is because this request is not idempotent
  // http://restcookbook.com/HTTP%20Methods/idempotency/
  // try to fire the same requests twice, see what happens
  @Patch('/games/:id([0-9]+)')
  async updateGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number,
    @Body() { position }: updatedGameData
  ) {
    console.log('=================', Date.now())
    // console.log(user)
    try {
      const game = await Game.findOneById(gameId)

      if (!game) throw new NotFoundError('Game does not exist')

      const player = await Player.findOne({ user, game })

      if (!player) throw new ForbiddenError('You are not part of this game')
      if (game.status !== 'started')
        throw new BadRequestError('The game is not started yet')

      if (player.id !== game.turn)
        throw new BadRequestError('It\'s not your turn')

      if (game.board[position.rowIndex][position.columnIndex] !== null) {
        throw new BadRequestError('Invalid move')
      }

      game.board[position.rowIndex][position.columnIndex] =
        game.generatedBoard[position.rowIndex][position.columnIndex]

      player.point = calculatePoints(
        player,
        game.generatedBoard[position.rowIndex][position.columnIndex]
      )
      const playerIndex = game.players.findIndex(p => p.id === player.id)
      game.players[playerIndex] = player

      const otherPlayerId = game.players.filter(p => p.id !== game.turn)[0].id
      game.turn = otherPlayerId!

      await Promise.all([player.save(), game.save()])

      io.emit('action', {
        type: 'UPDATE_GAME',
        payload: game
      })
      console.log('update')

      return game
    } catch (e) {
      console.log(e)
    }
  }

  @Authorized()
  @Get('/games/:id([0-9]+)')
  async getGame(@Param('id') id: number) {
    const game = await Game.findOneById(id)
    if (!game) throw new NotFoundError('game not found')
    const { generatedBoard, ...data } = game
    return { game: data }
  }

  @Authorized()
  @Get('/games')
  async getGames() {
    const games = await Game.find()
    console.log(games[0].players)
    return games
  }
}
