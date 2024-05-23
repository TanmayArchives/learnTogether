import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { DiscussionDomainModule } from '../domain'
import { DiscussionController } from './discussion.controller'

import { VideoDomainModule } from '../../../modules/video/domain'

import { DiscussionByVideoController } from './discussionByVideo.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { DiscussionByUserController } from './discussionByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    DiscussionDomainModule,

    VideoDomainModule,

    UserDomainModule,
  ],
  controllers: [
    DiscussionController,

    DiscussionByVideoController,

    DiscussionByUserController,
  ],
  providers: [],
})
export class DiscussionApplicationModule {}
