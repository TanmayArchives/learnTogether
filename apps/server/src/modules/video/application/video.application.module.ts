import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { VideoDomainModule } from '../domain'
import { VideoController } from './video.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { VideoByUserController } from './videoByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, VideoDomainModule, UserDomainModule],
  controllers: [VideoController, VideoByUserController],
  providers: [],
})
export class VideoApplicationModule {}
