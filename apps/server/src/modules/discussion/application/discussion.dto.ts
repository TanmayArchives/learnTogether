import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class DiscussionCreateDto {
  @IsString()
  @IsNotEmpty()
  status: string

  @IsString()
  @IsOptional()
  videoId?: string

  @IsString()
  @IsOptional()
  hostId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class DiscussionUpdateDto {
  @IsString()
  @IsOptional()
  status?: string

  @IsString()
  @IsOptional()
  videoId?: string

  @IsString()
  @IsOptional()
  hostId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
