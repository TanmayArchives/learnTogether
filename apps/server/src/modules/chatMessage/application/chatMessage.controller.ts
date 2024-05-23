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
import {
  ChatMessage,
  ChatMessageDomainFacade,
} from '@server/modules/chatMessage/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ChatMessageApplicationEvent } from './chatMessage.application.event'
import { ChatMessageCreateDto, ChatMessageUpdateDto } from './chatMessage.dto'

@Controller('/v1/chatMessages')
export class ChatMessageController {
  constructor(
    private eventService: EventService,
    private chatMessageDomainFacade: ChatMessageDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.chatMessageDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ChatMessageCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.chatMessageDomainFacade.create(body)

    await this.eventService.emit<ChatMessageApplicationEvent.ChatMessageCreated.Payload>(
      ChatMessageApplicationEvent.ChatMessageCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:chatMessageId')
  async findOne(
    @Param('chatMessageId') chatMessageId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.chatMessageDomainFacade.findOneByIdOrFail(
      chatMessageId,
      queryOptions,
    )

    return item
  }

  @Patch('/:chatMessageId')
  async update(
    @Param('chatMessageId') chatMessageId: string,
    @Body() body: ChatMessageUpdateDto,
  ) {
    const item =
      await this.chatMessageDomainFacade.findOneByIdOrFail(chatMessageId)

    const itemUpdated = await this.chatMessageDomainFacade.update(
      item,
      body as Partial<ChatMessage>,
    )
    return itemUpdated
  }

  @Delete('/:chatMessageId')
  async delete(@Param('chatMessageId') chatMessageId: string) {
    const item =
      await this.chatMessageDomainFacade.findOneByIdOrFail(chatMessageId)

    await this.chatMessageDomainFacade.delete(item)

    return item
  }
}
