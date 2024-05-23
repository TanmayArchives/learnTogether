import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { DiscussionMessage } from './discussionMessage.model'

import { Discussion } from '../../discussion/domain'

import { User } from '../../user/domain'

@Injectable()
export class DiscussionMessageDomainFacade {
  constructor(
    @InjectRepository(DiscussionMessage)
    private repository: Repository<DiscussionMessage>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<DiscussionMessage>): Promise<DiscussionMessage> {
    return this.repository.save(values)
  }

  async update(
    item: DiscussionMessage,
    values: Partial<DiscussionMessage>,
  ): Promise<DiscussionMessage> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: DiscussionMessage): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<DiscussionMessage> = {},
  ): Promise<DiscussionMessage[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<DiscussionMessage> = {},
  ): Promise<DiscussionMessage> {
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

  async findManyByDiscussion(
    item: Discussion,
    queryOptions: RequestHelper.QueryOptions<DiscussionMessage> = {},
  ): Promise<DiscussionMessage[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('discussion')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        discussionId: item.id,
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
    queryOptions: RequestHelper.QueryOptions<DiscussionMessage> = {},
  ): Promise<DiscussionMessage[]> {
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
