import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { PlaybackControl } from './playbackControl.model'

import { Video } from '../../video/domain'

@Injectable()
export class PlaybackControlDomainFacade {
  constructor(
    @InjectRepository(PlaybackControl)
    private repository: Repository<PlaybackControl>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<PlaybackControl>): Promise<PlaybackControl> {
    return this.repository.save(values)
  }

  async update(
    item: PlaybackControl,
    values: Partial<PlaybackControl>,
  ): Promise<PlaybackControl> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: PlaybackControl): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<PlaybackControl> = {},
  ): Promise<PlaybackControl[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<PlaybackControl> = {},
  ): Promise<PlaybackControl> {
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
    queryOptions: RequestHelper.QueryOptions<PlaybackControl> = {},
  ): Promise<PlaybackControl[]> {
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
}
