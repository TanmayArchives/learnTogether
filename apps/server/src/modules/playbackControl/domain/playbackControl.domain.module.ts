import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { PlaybackControlDomainFacade } from './playbackControl.domain.facade'
import { PlaybackControl } from './playbackControl.model'

@Module({
  imports: [TypeOrmModule.forFeature([PlaybackControl]), DatabaseHelperModule],
  providers: [PlaybackControlDomainFacade, PlaybackControlDomainFacade],
  exports: [PlaybackControlDomainFacade],
})
export class PlaybackControlDomainModule {}
