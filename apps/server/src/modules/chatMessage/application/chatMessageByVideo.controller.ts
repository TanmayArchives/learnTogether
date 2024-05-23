import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ChatMessageDomainFacade } from '@server/modules/chatMessage/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ChatMessageApplicationEvent } from './chatMessage.application.event'
import { ChatMessageCreateDto } from './chatMessage.dto'

import { VideoDomainFacade } from '../../video/domain'

@Controller('/v1/videos')
export class ChatMessageByVideoController {
  constructor(
    private videoDomainFacade: VideoDomainFacade,

    private chatMessageDomainFacade: ChatMessageDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/video/:videoId/chatMessages')
  async findManyVideoId(
    @Param('videoId') videoId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.videoDomainFacade.findOneByIdOrFail(videoId)

    const items = await this.chatMessageDomainFacade.findManyByVideo(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/video/:videoId/chatMessages')
  async createByVideoId(
    @Param('videoId') videoId: string,
    @Body() body: ChatMessageCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, videoId }

    const item = await this.chatMessageDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ChatMessageApplicationEvent.ChatMessageCreated.Payload>(
      ChatMessageApplicationEvent.ChatMessageCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
