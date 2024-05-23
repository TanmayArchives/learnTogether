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

import { User } from '../../../modules/user/domain'

import { PlaybackControl } from '../../../modules/playbackControl/domain'

import { ChatMessage } from '../../../modules/chatMessage/domain'

import { Discussion } from '../../../modules/discussion/domain'

@Entity()
export class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  url: string

  @Column({ nullable: true })
  hostId?: string

  @ManyToOne(() => User, parent => parent.videosAsHost)
  @JoinColumn({ name: 'hostId' })
  host?: User

  @OneToMany(() => PlaybackControl, child => child.video)
  playbackControls?: PlaybackControl[]

  @OneToMany(() => ChatMessage, child => child.video)
  chatMessages?: ChatMessage[]

  @OneToMany(() => Discussion, child => child.video)
  discussions?: Discussion[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
