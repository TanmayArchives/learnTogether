import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Discussion } from './discussion.model'

import { Video } from '../../video/domain'

import { User } from '../../user/domain'

@Injectable()
export class DiscussionDomainFacade {
  constructor(
    @InjectRepository(Discussion)
    private repository: Repository<Discussion>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Discussion>): Promise<Discussion> {
    return this.repository.save(values)
  }

  async update(
    item: Discussion,
    values: Partial<Discussion>,
  ): Promise<Discussion> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Discussion): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Discussion> = {},
  ): Promise<Discussion[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Discussion> = {},
  ): Promise<Discussion> {
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
    queryOptions: RequestHelper.QueryOptions<Discussion> = {},
  ): Promise<Discussion[]> {
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

  async findManyByHost(
    item: User,
    queryOptions: RequestHelper.QueryOptions<Discussion> = {},
  ): Promise<Discussion[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('host')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        hostId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
