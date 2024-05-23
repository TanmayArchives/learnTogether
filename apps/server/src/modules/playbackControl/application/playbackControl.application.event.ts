export namespace PlaybackControlApplicationEvent {
  export namespace PlaybackControlCreated {
    export const key = 'playbackControl.application.playbackControl.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
