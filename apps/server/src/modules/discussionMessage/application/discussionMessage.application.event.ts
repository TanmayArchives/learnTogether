export namespace DiscussionMessageApplicationEvent {
  export namespace DiscussionMessageCreated {
    export const key = 'discussionMessage.application.discussionMessage.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
