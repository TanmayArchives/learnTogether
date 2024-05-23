import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { DiscussionMessageDomainFacade } from './discussionMessage.domain.facade'
import { DiscussionMessage } from './discussionMessage.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([DiscussionMessage]),
    DatabaseHelperModule,
  ],
  providers: [DiscussionMessageDomainFacade, DiscussionMessageDomainFacade],
  exports: [DiscussionMessageDomainFacade],
})
export class DiscussionMessageDomainModule {}
