import { User } from '../user'

import { PlaybackControl } from '../playbackControl'

import { ChatMessage } from '../chatMessage'

import { Discussion } from '../discussion'

export class Video {
  id: string

  url: string

  hostId?: string

  host?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  playbackControls?: PlaybackControl[]

  chatMessages?: ChatMessage[]

  discussions?: Discussion[]
}
