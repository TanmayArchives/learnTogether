import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { DiscussionMessageDomainFacade } from '@server/modules/discussionMessage/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { DiscussionMessageApplicationEvent } from './discussionMessage.application.event'
import { DiscussionMessageCreateDto } from './discussionMessage.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class DiscussionMessageByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private discussionMessageDomainFacade: DiscussionMessageDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/discussionMessages')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.discussionMessageDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/discussionMessages')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: DiscussionMessageCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

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
