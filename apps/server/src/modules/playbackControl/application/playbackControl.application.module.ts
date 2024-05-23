import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { PlaybackControlDomainModule } from '../domain'
import { PlaybackControlController } from './playbackControl.controller'

import { VideoDomainModule } from '../../../modules/video/domain'

import { PlaybackControlByVideoController } from './playbackControlByVideo.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    PlaybackControlDomainModule,

    VideoDomainModule,
  ],
  controllers: [PlaybackControlController, PlaybackControlByVideoController],
  providers: [],
})
export class PlaybackControlApplicationModule {}
