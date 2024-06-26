import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { DiscussionDomainFacade } from '@server/modules/discussion/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { DiscussionApplicationEvent } from './discussion.application.event'
import { DiscussionCreateDto } from './discussion.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class DiscussionByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private discussionDomainFacade: DiscussionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/host/:hostId/discussions')
  async findManyHostId(
    @Param('hostId') hostId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(hostId)

    const items = await this.discussionDomainFacade.findManyByHost(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/host/:hostId/discussions')
  async createByHostId(
    @Param('hostId') hostId: string,
    @Body() body: DiscussionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, hostId }

    const item = await this.discussionDomainFacade.create(valuesUpdated)

    await this.eventService.emit<DiscussionApplicationEvent.DiscussionCreated.Payload>(
      DiscussionApplicationEvent.DiscussionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
