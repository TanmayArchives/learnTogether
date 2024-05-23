import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class PlaybackControlCreateDto {
  @IsString()
  @IsNotEmpty()
  action: string

  @IsString()
  @IsNotEmpty()
  timestamp: string

  @IsString()
  @IsOptional()
  videoId?: string

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

export class PlaybackControlUpdateDto {
  @IsString()
  @IsOptional()
  action?: string

  @IsString()
  @IsOptional()
  timestamp?: string

  @IsString()
  @IsOptional()
  videoId?: string

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
