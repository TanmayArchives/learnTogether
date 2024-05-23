import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ChatMessageDomainFacade } from './chatMessage.domain.facade'
import { ChatMessage } from './chatMessage.model'

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage]), DatabaseHelperModule],
  providers: [ChatMessageDomainFacade, ChatMessageDomainFacade],
  exports: [ChatMessageDomainFacade],
})
export class ChatMessageDomainModule {}
