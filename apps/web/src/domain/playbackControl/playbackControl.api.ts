import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { PlaybackControl } from './playbackControl.model'

export class PlaybackControlApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<PlaybackControl>,
  ): Promise<PlaybackControl[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/playbackControls${buildOptions}`)
  }

  static findOne(
    playbackControlId: string,
    queryOptions?: ApiHelper.QueryOptions<PlaybackControl>,
  ): Promise<PlaybackControl> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/playbackControls/${playbackControlId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<PlaybackControl>): Promise<PlaybackControl> {
    return HttpService.api.post(`/v1/playbackControls`, values)
  }

  static updateOne(
    playbackControlId: string,
    values: Partial<PlaybackControl>,
  ): Promise<PlaybackControl> {
    return HttpService.api.patch(
      `/v1/playbackControls/${playbackControlId}`,
      values,
    )
  }

  static deleteOne(playbackControlId: string): Promise<void> {
    return HttpService.api.delete(`/v1/playbackControls/${playbackControlId}`)
  }

  static findManyByVideoId(
    videoId: string,
    queryOptions?: ApiHelper.QueryOptions<PlaybackControl>,
  ): Promise<PlaybackControl[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/videos/video/${videoId}/playbackControls${buildOptions}`,
    )
  }

  static createOneByVideoId(
    videoId: string,
    values: Partial<PlaybackControl>,
  ): Promise<PlaybackControl> {
    return HttpService.api.post(
      `/v1/videos/video/${videoId}/playbackControls`,
      values,
    )
  }
}
