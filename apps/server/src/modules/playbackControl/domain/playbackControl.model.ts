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

@Entity()
export class PlaybackControl {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  action: string

  @Column({})
  timestamp: string

  @Column({ nullable: true })
  videoId?: string

  @ManyToOne(() => Video, parent => parent.playbackControls)
  @JoinColumn({ name: 'videoId' })
  video?: Video

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
