import { Video } from '../video'

import { User } from '../user'

import { DiscussionMessage } from '../discussionMessage'

export class Discussion {
  id: string

  status: string

  videoId?: string

  video?: Video

  hostId?: string

  host?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  discussionMessages?: DiscussionMessage[]
}
