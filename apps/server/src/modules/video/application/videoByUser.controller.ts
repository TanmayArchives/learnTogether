import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { VideoDomainFacade } from '@server/modules/video/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { VideoApplicationEvent } from './video.application.event'
import { VideoCreateDto } from './video.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class VideoByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private videoDomainFacade: VideoDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/host/:hostId/videos')
  async findManyHostId(
    @Param('hostId') hostId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(hostId)

    const items = await this.videoDomainFacade.findManyByHost(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/host/:hostId/videos')
  async createByHostId(
    @Param('hostId') hostId: string,
    @Body() body: VideoCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, hostId }

    const item = await this.videoDomainFacade.create(valuesUpdated)

    await this.eventService.emit<VideoApplicationEvent.VideoCreated.Payload>(
      VideoApplicationEvent.VideoCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
