import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { PlaybackControlDomainFacade } from '@server/modules/playbackControl/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { PlaybackControlApplicationEvent } from './playbackControl.application.event'
import { PlaybackControlCreateDto } from './playbackControl.dto'

import { VideoDomainFacade } from '../../video/domain'

@Controller('/v1/videos')
export class PlaybackControlByVideoController {
  constructor(
    private videoDomainFacade: VideoDomainFacade,

    private playbackControlDomainFacade: PlaybackControlDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/video/:videoId/playbackControls')
  async findManyVideoId(
    @Param('videoId') videoId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.videoDomainFacade.findOneByIdOrFail(videoId)

    const items = await this.playbackControlDomainFacade.findManyByVideo(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/video/:videoId/playbackControls')
  async createByVideoId(
    @Param('videoId') videoId: string,
    @Body() body: PlaybackControlCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, videoId }

    const item = await this.playbackControlDomainFacade.create(valuesUpdated)

    await this.eventService.emit<PlaybackControlApplicationEvent.PlaybackControlCreated.Payload>(
      PlaybackControlApplicationEvent.PlaybackControlCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
