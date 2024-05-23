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
  PlaybackControl,
  PlaybackControlDomainFacade,
} from '@server/modules/playbackControl/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { PlaybackControlApplicationEvent } from './playbackControl.application.event'
import {
  PlaybackControlCreateDto,
  PlaybackControlUpdateDto,
} from './playbackControl.dto'

@Controller('/v1/playbackControls')
export class PlaybackControlController {
  constructor(
    private eventService: EventService,
    private playbackControlDomainFacade: PlaybackControlDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.playbackControlDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: PlaybackControlCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.playbackControlDomainFacade.create(body)

    await this.eventService.emit<PlaybackControlApplicationEvent.PlaybackControlCreated.Payload>(
      PlaybackControlApplicationEvent.PlaybackControlCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:playbackControlId')
  async findOne(
    @Param('playbackControlId') playbackControlId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.playbackControlDomainFacade.findOneByIdOrFail(
      playbackControlId,
      queryOptions,
    )

    return item
  }

  @Patch('/:playbackControlId')
  async update(
    @Param('playbackControlId') playbackControlId: string,
    @Body() body: PlaybackControlUpdateDto,
  ) {
    const item =
      await this.playbackControlDomainFacade.findOneByIdOrFail(
        playbackControlId,
      )

    const itemUpdated = await this.playbackControlDomainFacade.update(
      item,
      body as Partial<PlaybackControl>,
    )
    return itemUpdated
  }

  @Delete('/:playbackControlId')
  async delete(@Param('playbackControlId') playbackControlId: string) {
    const item =
      await this.playbackControlDomainFacade.findOneByIdOrFail(
        playbackControlId,
      )

    await this.playbackControlDomainFacade.delete(item)

    return item
  }
}
