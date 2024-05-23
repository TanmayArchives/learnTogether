import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationVideoSubscriber } from './subscribers/notification.video.subscriber'

import { NotificationPlaybackControlSubscriber } from './subscribers/notification.playbackControl.subscriber'

import { NotificationChatMessageSubscriber } from './subscribers/notification.chatMessage.subscriber'

import { NotificationDiscussionSubscriber } from './subscribers/notification.discussion.subscriber'

import { NotificationDiscussionMessageSubscriber } from './subscribers/notification.discussionMessage.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationVideoSubscriber,

    NotificationPlaybackControlSubscriber,

    NotificationChatMessageSubscriber,

    NotificationDiscussionSubscriber,

    NotificationDiscussionMessageSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
