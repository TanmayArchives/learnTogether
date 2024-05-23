import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ChatMessageDomainModule } from '../domain'
import { ChatMessageController } from './chatMessage.controller'

import { VideoDomainModule } from '../../../modules/video/domain'

import { ChatMessageByVideoController } from './chatMessageByVideo.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { ChatMessageByUserController } from './chatMessageByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ChatMessageDomainModule,

    VideoDomainModule,

    UserDomainModule,
  ],
  controllers: [
    ChatMessageController,

    ChatMessageByVideoController,

    ChatMessageByUserController,
  ],
  providers: [],
})
export class ChatMessageApplicationModule {}
