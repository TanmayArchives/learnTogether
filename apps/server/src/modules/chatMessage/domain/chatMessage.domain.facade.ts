import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { ChatMessage } from './chatMessage.model'

import { Video } from '../../video/domain'

import { User } from '../../user/domain'

@Injectable()
export class ChatMessageDomainFacade {
  constructor(
    @InjectRepository(ChatMessage)
    private repository: Repository<ChatMessage>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<ChatMessage>): Promise<ChatMessage> {
    return this.repository.save(values)
  }

  async update(
    item: ChatMessage,
    values: Partial<ChatMessage>,
  ): Promise<ChatMessage> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: ChatMessage): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<ChatMessage> = {},
  ): Promise<ChatMessage[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<ChatMessage> = {},
  ): Promise<ChatMessage> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByVideo(
    item: Video,
    queryOptions: RequestHelper.QueryOptions<ChatMessage> = {},
  ): Promise<ChatMessage[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('video')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        videoId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByUser(
    item: User,
    queryOptions: RequestHelper.QueryOptions<ChatMessage> = {},
  ): Promise<ChatMessage[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('user')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        userId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
