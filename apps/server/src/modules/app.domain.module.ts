import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { VideoDomainModule } from './video/domain'

import { PlaybackControlDomainModule } from './playbackControl/domain'

import { ChatMessageDomainModule } from './chatMessage/domain'

import { DiscussionDomainModule } from './discussion/domain'

import { DiscussionMessageDomainModule } from './discussionMessage/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    VideoDomainModule,

    PlaybackControlDomainModule,

    ChatMessageDomainModule,

    DiscussionDomainModule,

    DiscussionMessageDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
