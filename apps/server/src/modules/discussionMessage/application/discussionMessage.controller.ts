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
  DiscussionMessage,
  DiscussionMessageDomainFacade,
} from '@server/modules/discussionMessage/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { DiscussionMessageApplicationEvent } from './discussionMessage.application.event'
import {
  DiscussionMessageCreateDto,
  DiscussionMessageUpdateDto,
} from './discussionMessage.dto'

@Controller('/v1/discussionMessages')
export class DiscussionMessageController {
  constructor(
    private eventService: EventService,
    private discussionMessageDomainFacade: DiscussionMessageDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items =
      await this.discussionMessageDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: DiscussionMessageCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.discussionMessageDomainFacade.create(body)

    await this.eventService.emit<DiscussionMessageApplicationEvent.DiscussionMessageCreated.Payload>(
      DiscussionMessageApplicationEvent.DiscussionMessageCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:discussionMessageId')
  async findOne(
    @Param('discussionMessageId') discussionMessageId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.discussionMessageDomainFacade.findOneByIdOrFail(
      discussionMessageId,
      queryOptions,
    )

    return item
  }

  @Patch('/:discussionMessageId')
  async update(
    @Param('discussionMessageId') discussionMessageId: string,
    @Body() body: DiscussionMessageUpdateDto,
  ) {
    const item =
      await this.discussionMessageDomainFacade.findOneByIdOrFail(
        discussionMessageId,
      )

    const itemUpdated = await this.discussionMessageDomainFacade.update(
      item,
      body as Partial<DiscussionMessage>,
    )
    return itemUpdated
  }

  @Delete('/:discussionMessageId')
  async delete(@Param('discussionMessageId') discussionMessageId: string) {
    const item =
      await this.discussionMessageDomainFacade.findOneByIdOrFail(
        discussionMessageId,
      )

    await this.discussionMessageDomainFacade.delete(item)

    return item
  }
}
