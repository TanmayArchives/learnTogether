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

import { DiscussionMessage } from '../../../modules/discussionMessage/domain'

@Entity()
export class Discussion {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  status: string

  @Column({ nullable: true })
  videoId?: string

  @ManyToOne(() => Video, parent => parent.discussions)
  @JoinColumn({ name: 'videoId' })
  video?: Video

  @Column({ nullable: true })
  hostId?: string

  @ManyToOne(() => User, parent => parent.discussionsAsHost)
  @JoinColumn({ name: 'hostId' })
  host?: User

  @OneToMany(() => DiscussionMessage, child => child.discussion)
  discussionMessages?: DiscussionMessage[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
