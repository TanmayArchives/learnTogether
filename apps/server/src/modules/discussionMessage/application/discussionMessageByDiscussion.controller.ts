import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { DiscussionMessageDomainFacade } from '@server/modules/discussionMessage/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { DiscussionMessageApplicationEvent } from './discussionMessage.application.event'
import { DiscussionMessageCreateDto } from './discussionMessage.dto'

import { DiscussionDomainFacade } from '../../discussion/domain'

@Controller('/v1/discussions')
export class DiscussionMessageByDiscussionController {
  constructor(
    private discussionDomainFacade: DiscussionDomainFacade,

    private discussionMessageDomainFacade: DiscussionMessageDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/discussion/:discussionId/discussionMessages')
  async findManyDiscussionId(
    @Param('discussionId') discussionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.discussionDomainFacade.findOneByIdOrFail(discussionId)

    const items = await this.discussionMessageDomainFacade.findManyByDiscussion(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/discussion/:discussionId/discussionMessages')
  async createByDiscussionId(
    @Param('discussionId') discussionId: string,
    @Body() body: DiscussionMessageCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, discussionId }

    const item = await this.discussionMessageDomainFacade.create(valuesUpdated)

    await this.eventService.emit<DiscussionMessageApplicationEvent.DiscussionMessageCreated.Payload>(
      DiscussionMessageApplicationEvent.DiscussionMessageCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
