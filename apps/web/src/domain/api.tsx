import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { BillingApi } from './billing/billing.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { VideoApi } from './video/video.api'

import { PlaybackControlApi } from './playbackControl/playbackControl.api'

import { ChatMessageApi } from './chatMessage/chatMessage.api'

import { DiscussionApi } from './discussion/discussion.api'

import { DiscussionMessageApi } from './discussionMessage/discussionMessage.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Billing extends BillingApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Video extends VideoApi {}

  export class PlaybackControl extends PlaybackControlApi {}

  export class ChatMessage extends ChatMessageApi {}

  export class Discussion extends DiscussionApi {}

  export class DiscussionMessage extends DiscussionMessageApi {}
}
