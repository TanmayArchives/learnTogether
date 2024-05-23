import { Video } from '../video'

export class PlaybackControl {
  id: string

  action: string

  timestamp: string

  videoId?: string

  video?: Video

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
