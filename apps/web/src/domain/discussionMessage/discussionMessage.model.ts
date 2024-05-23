import { Discussion } from '../discussion'

import { User } from '../user'

export class DiscussionMessage {
  id: string

  message: string

  timestamp: string

  discussionId?: string

  discussion?: Discussion

  userId?: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
