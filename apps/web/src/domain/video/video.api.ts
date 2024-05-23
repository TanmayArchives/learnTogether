import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Video } from './video.model'

export class VideoApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Video>,
  ): Promise<Video[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/videos${buildOptions}`)
  }

  static findOne(
    videoId: string,
    queryOptions?: ApiHelper.QueryOptions<Video>,
  ): Promise<Video> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/videos/${videoId}${buildOptions}`)
  }

  static createOne(values: Partial<Video>): Promise<Video> {
    return HttpService.api.post(`/v1/videos`, values)
  }

  static updateOne(videoId: string, values: Partial<Video>): Promise<Video> {
    return HttpService.api.patch(`/v1/videos/${videoId}`, values)
  }

  static deleteOne(videoId: string): Promise<void> {
    return HttpService.api.delete(`/v1/videos/${videoId}`)
  }

  static findManyByHostId(
    hostId: string,
    queryOptions?: ApiHelper.QueryOptions<Video>,
  ): Promise<Video[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/users/host/${hostId}/videos${buildOptions}`)
  }

  static createOneByHostId(
    hostId: string,
    values: Partial<Video>,
  ): Promise<Video> {
    return HttpService.api.post(`/v1/users/host/${hostId}/videos`, values)
  }
}
