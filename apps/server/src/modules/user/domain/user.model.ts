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

import { Notification } from '../../../modules/notification/domain'

import { Video } from '../../../modules/video/domain'

import { ChatMessage } from '../../../modules/chatMessage/domain'

import { Discussion } from '../../../modules/discussion/domain'

import { DiscussionMessage } from '../../../modules/discussionMessage/domain'

export enum UserStatus {
  VERIFIED = 'VERIFIED',
  CREATED = 'CREATED',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true, unique: true })
  email?: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  pictureUrl?: string

  @Column({ nullable: true, select: false })
  stripeCustomerId?: string

  @Column({ nullable: true, select: false })
  password?: string

  @Column({ enum: UserStatus, default: UserStatus.VERIFIED })
  status: UserStatus

  @OneToMany(() => Video, child => child.host)
  videosAsHost?: Video[]

  @OneToMany(() => ChatMessage, child => child.user)
  chatMessages?: ChatMessage[]

  @OneToMany(() => Discussion, child => child.host)
  discussionsAsHost?: Discussion[]

  @OneToMany(() => DiscussionMessage, child => child.user)
  discussionMessages?: DiscussionMessage[]

  @OneToMany(() => Notification, notification => notification.user)
  notifications?: Notification[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
