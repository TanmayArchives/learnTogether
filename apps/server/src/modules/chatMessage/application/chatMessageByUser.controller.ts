import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ChatMessageDomainFacade } from '@server/modules/chatMessage/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ChatMessageApplicationEvent } from './chatMessage.application.event'
import { ChatMessageCreateDto } from './chatMessage.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class ChatMessageByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private chatMessageDomainFacade: ChatMessageDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/chatMessages')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.chatMessageDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/chatMessages')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: ChatMessageCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

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
