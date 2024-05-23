export namespace ChatMessageApplicationEvent {
  export namespace ChatMessageCreated {
    export const key = 'chatMessage.application.chatMessage.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
