import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Index,
  OneToMany,
  ManyToOne,
  BeforeInsert
} from 'typeorm'
import User from '../users/entity'
import { getRandomBoard, getEmptyBoard } from '../libs/gameFunctions'
import { boardSetting } from './gameSettings'

export type Symbol = 'x' | 'o' | 'z' | 'm' | null
export type Row = [Symbol, Symbol, Symbol]
export type Board = [Row, Row, Row]

type Status = 'pending' | 'started' | 'finished'

@Entity()
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', { default: getEmptyBoard() })
  board

  @Column('json')
  generatedBoard

  @Column('int')
  turn: number

  @Column('char', { length: 1, nullable: true })
  winner: Symbol

  @Column('text', { default: 'pending' })
  status: Status

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, { eager: true })
  players: Player[]

  @BeforeInsert()
  getRandomBoard() {
    this.generatedBoard = getRandomBoard()
  }
}

@Entity()
@Index(['game', 'user'], { unique: true })
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  @Column({ default: 0 })
  point: number

  // @Column()
  // userId: number
}
