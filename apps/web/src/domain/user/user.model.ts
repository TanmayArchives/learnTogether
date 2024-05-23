import { Notification } from '../notification'

import { Video } from '../video'

import { ChatMessage } from '../chatMessage'

import { Discussion } from '../discussion'

import { DiscussionMessage } from '../discussionMessage'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email?: string
  status: UserStatus
  name?: string
  pictureUrl?: string
  password?: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  videosAsHost?: Video[]

  chatMessages?: ChatMessage[]

  discussionsAsHost?: Discussion[]

  discussionMessages?: DiscussionMessage[]
}
