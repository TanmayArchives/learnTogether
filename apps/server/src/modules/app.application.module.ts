import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { VideoApplicationModule } from './video/application'

import { PlaybackControlApplicationModule } from './playbackControl/application'

import { ChatMessageApplicationModule } from './chatMessage/application'

import { DiscussionApplicationModule } from './discussion/application'

import { DiscussionMessageApplicationModule } from './discussionMessage/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { BillingApplicationModule } from './billing/application'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,
    BillingApplicationModule,

    VideoApplicationModule,

    PlaybackControlApplicationModule,

    ChatMessageApplicationModule,

    DiscussionApplicationModule,

    DiscussionMessageApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
