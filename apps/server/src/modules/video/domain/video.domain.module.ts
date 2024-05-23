import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { VideoDomainFacade } from './video.domain.facade'
import { Video } from './video.model'

@Module({
  imports: [TypeOrmModule.forFeature([Video]), DatabaseHelperModule],
  providers: [VideoDomainFacade, VideoDomainFacade],
  exports: [VideoDomainFacade],
})
export class VideoDomainModule {}
