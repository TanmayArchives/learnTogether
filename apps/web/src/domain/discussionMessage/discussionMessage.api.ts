import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { DiscussionMessage } from './discussionMessage.model'

export class DiscussionMessageApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<DiscussionMessage>,
  ): Promise<DiscussionMessage[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/discussionMessages${buildOptions}`)
  }

  static findOne(
    discussionMessageId: string,
    queryOptions?: ApiHelper.QueryOptions<DiscussionMessage>,
  ): Promise<DiscussionMessage> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/discussionMessages/${discussionMessageId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<DiscussionMessage>,
  ): Promise<DiscussionMessage> {
    return HttpService.api.post(`/v1/discussionMessages`, values)
  }

  static updateOne(
    discussionMessageId: string,
    values: Partial<DiscussionMessage>,
  ): Promise<DiscussionMessage> {
    return HttpService.api.patch(
      `/v1/discussionMessages/${discussionMessageId}`,
      values,
    )
  }

  static deleteOne(discussionMessageId: string): Promise<void> {
    return HttpService.api.delete(
      `/v1/discussionMessages/${discussionMessageId}`,
    )
  }

  static findManyByDiscussionId(
    discussionId: string,
    queryOptions?: ApiHelper.QueryOptions<DiscussionMessage>,
  ): Promise<DiscussionMessage[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/discussions/discussion/${discussionId}/discussionMessages${buildOptions}`,
    )
  }

  static createOneByDiscussionId(
    discussionId: string,
    values: Partial<DiscussionMessage>,
  ): Promise<DiscussionMessage> {
    return HttpService.api.post(
      `/v1/discussions/discussion/${discussionId}/discussionMessages`,
      values,
    )
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<DiscussionMessage>,
  ): Promise<DiscussionMessage[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/discussionMessages${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<DiscussionMessage>,
  ): Promise<DiscussionMessage> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/discussionMessages`,
      values,
    )
  }
}
