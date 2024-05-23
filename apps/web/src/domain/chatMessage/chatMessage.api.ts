import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { ChatMessage } from './chatMessage.model'

export class ChatMessageApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<ChatMessage>,
  ): Promise<ChatMessage[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/chatMessages${buildOptions}`)
  }

  static findOne(
    chatMessageId: string,
    queryOptions?: ApiHelper.QueryOptions<ChatMessage>,
  ): Promise<ChatMessage> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/chatMessages/${chatMessageId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<ChatMessage>): Promise<ChatMessage> {
    return HttpService.api.post(`/v1/chatMessages`, values)
  }

  static updateOne(
    chatMessageId: string,
    values: Partial<ChatMessage>,
  ): Promise<ChatMessage> {
    return HttpService.api.patch(`/v1/chatMessages/${chatMessageId}`, values)
  }

  static deleteOne(chatMessageId: string): Promise<void> {
    return HttpService.api.delete(`/v1/chatMessages/${chatMessageId}`)
  }

  static findManyByVideoId(
    videoId: string,
    queryOptions?: ApiHelper.QueryOptions<ChatMessage>,
  ): Promise<ChatMessage[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/videos/video/${videoId}/chatMessages${buildOptions}`,
    )
  }

  static createOneByVideoId(
    videoId: string,
    values: Partial<ChatMessage>,
  ): Promise<ChatMessage> {
    return HttpService.api.post(
      `/v1/videos/video/${videoId}/chatMessages`,
      values,
    )
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<ChatMessage>,
  ): Promise<ChatMessage[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/chatMessages${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<ChatMessage>,
  ): Promise<ChatMessage> {
    return HttpService.api.post(`/v1/users/user/${userId}/chatMessages`, values)
  }
}
