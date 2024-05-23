import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Discussion } from './discussion.model'

export class DiscussionApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Discussion>,
  ): Promise<Discussion[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/discussions${buildOptions}`)
  }

  static findOne(
    discussionId: string,
    queryOptions?: ApiHelper.QueryOptions<Discussion>,
  ): Promise<Discussion> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/discussions/${discussionId}${buildOptions}`)
  }

  static createOne(values: Partial<Discussion>): Promise<Discussion> {
    return HttpService.api.post(`/v1/discussions`, values)
  }

  static updateOne(
    discussionId: string,
    values: Partial<Discussion>,
  ): Promise<Discussion> {
    return HttpService.api.patch(`/v1/discussions/${discussionId}`, values)
  }

  static deleteOne(discussionId: string): Promise<void> {
    return HttpService.api.delete(`/v1/discussions/${discussionId}`)
  }

  static findManyByVideoId(
    videoId: string,
    queryOptions?: ApiHelper.QueryOptions<Discussion>,
  ): Promise<Discussion[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/videos/video/${videoId}/discussions${buildOptions}`,
    )
  }

  static createOneByVideoId(
    videoId: string,
    values: Partial<Discussion>,
  ): Promise<Discussion> {
    return HttpService.api.post(
      `/v1/videos/video/${videoId}/discussions`,
      values,
    )
  }

  static findManyByHostId(
    hostId: string,
    queryOptions?: ApiHelper.QueryOptions<Discussion>,
  ): Promise<Discussion[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/host/${hostId}/discussions${buildOptions}`,
    )
  }

  static createOneByHostId(
    hostId: string,
    values: Partial<Discussion>,
  ): Promise<Discussion> {
    return HttpService.api.post(`/v1/users/host/${hostId}/discussions`, values)
  }
}
