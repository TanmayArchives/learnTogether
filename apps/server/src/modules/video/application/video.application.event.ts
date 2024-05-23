export namespace VideoApplicationEvent {
  export namespace VideoCreated {
    export const key = 'video.application.video.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
