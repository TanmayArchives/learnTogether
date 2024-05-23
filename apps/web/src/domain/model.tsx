import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'
import {
  BillingPayment as BillingPaymentModel,
  BillingProduct as BillingProductModel,
  BillingSubscription as BillingSubscriptionModel,
} from './billing/billing.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Video as VideoModel } from './video/video.model'

import { PlaybackControl as PlaybackControlModel } from './playbackControl/playbackControl.model'

import { ChatMessage as ChatMessageModel } from './chatMessage/chatMessage.model'

import { Discussion as DiscussionModel } from './discussion/discussion.model'

import { DiscussionMessage as DiscussionMessageModel } from './discussionMessage/discussionMessage.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}
  export class BillingProduct extends BillingProductModel {}
  export class BillingPayment extends BillingPaymentModel {}
  export class BillingSubscription extends BillingSubscriptionModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Video extends VideoModel {}

  export class PlaybackControl extends PlaybackControlModel {}

  export class ChatMessage extends ChatMessageModel {}

  export class Discussion extends DiscussionModel {}

  export class DiscussionMessage extends DiscussionMessageModel {}
}
