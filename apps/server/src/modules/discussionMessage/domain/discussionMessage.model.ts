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

import { Discussion } from '../../../modules/discussion/domain'

import { User } from '../../../modules/user/domain'

@Entity()
export class DiscussionMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  message: string

  @Column({})
  timestamp: string

  @Column({ nullable: true })
  discussionId?: string

  @ManyToOne(() => Discussion, parent => parent.discussionMessages)
  @JoinColumn({ name: 'discussionId' })
  discussion?: Discussion

  @Column({ nullable: true })
  userId?: string

  @ManyToOne(() => User, parent => parent.discussionMessages)
  @JoinColumn({ name: 'userId' })
  user?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
