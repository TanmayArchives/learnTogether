import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Video } from '../../../modules/video/domain'

import { User } from '../../../modules/user/domain'

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  message: string

  @Column({})
  timestamp: string

  @Column({ nullable: true })
  videoId?: string

  @ManyToOne(() => Video, parent => parent.chatMessages)
  @JoinColumn({ name: 'videoId' })
  video?: Video

  @Column({ nullable: true })
  userId?: string

  @ManyToOne(() => User, parent => parent.chatMessages)
  @JoinColumn({ name: 'userId' })
  user?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
