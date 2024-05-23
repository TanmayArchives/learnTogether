import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class VideoCreateDto {
  @IsString()
  @IsNotEmpty()
  url: string

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

export class VideoUpdateDto {
  @IsString()
  @IsOptional()
  url?: string

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
