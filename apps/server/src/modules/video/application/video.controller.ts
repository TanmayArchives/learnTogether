import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import { Video, VideoDomainFacade } from '@server/modules/video/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { VideoApplicationEvent } from './video.application.event'
import { VideoCreateDto, VideoUpdateDto } from './video.dto'

@Controller('/v1/videos')
export class VideoController {
  constructor(
    private eventService: EventService,
    private videoDomainFacade: VideoDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.videoDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: VideoCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.videoDomainFacade.create(body)

    await this.eventService.emit<VideoApplicationEvent.VideoCreated.Payload>(
      VideoApplicationEvent.VideoCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:videoId')
  async findOne(@Param('videoId') videoId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.videoDomainFacade.findOneByIdOrFail(
      videoId,
      queryOptions,
    )

    return item
  }

  @Patch('/:videoId')
  async update(
    @Param('videoId') videoId: string,
    @Body() body: VideoUpdateDto,
  ) {
    const item = await this.videoDomainFacade.findOneByIdOrFail(videoId)

    const itemUpdated = await this.videoDomainFacade.update(
      item,
      body as Partial<Video>,
    )
    return itemUpdated
  }

  @Delete('/:videoId')
  async delete(@Param('videoId') videoId: string) {
    const item = await this.videoDomainFacade.findOneByIdOrFail(videoId)

    await this.videoDomainFacade.delete(item)

    return item
  }
}
