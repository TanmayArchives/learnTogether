import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { DiscussionMessageDomainModule } from '../domain'
import { DiscussionMessageController } from './discussionMessage.controller'

import { DiscussionDomainModule } from '../../../modules/discussion/domain'

import { DiscussionMessageByDiscussionController } from './discussionMessageByDiscussion.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { DiscussionMessageByUserController } from './discussionMessageByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    DiscussionMessageDomainModule,

    DiscussionDomainModule,

    UserDomainModule,
  ],
  controllers: [
    DiscussionMessageController,

    DiscussionMessageByDiscussionController,

    DiscussionMessageByUserController,
  ],
  providers: [],
})
export class DiscussionMessageApplicationModule {}
