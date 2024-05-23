import { Video } from '../video'

import { User } from '../user'

export class ChatMessage {
  id: string

  message: string

  timestamp: string

  videoId?: string

  video?: Video

  userId?: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
