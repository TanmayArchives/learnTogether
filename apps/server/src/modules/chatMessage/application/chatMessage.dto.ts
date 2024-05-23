import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ChatMessageCreateDto {
  @IsString()
  @IsNotEmpty()
  message: string

  @IsString()
  @IsNotEmpty()
  timestamp: string

  @IsString()
  @IsOptional()
  videoId?: string

  @IsString()
  @IsOptional()
  userId?: string

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

export class ChatMessageUpdateDto {
  @IsString()
  @IsOptional()
  message?: string

  @IsString()
  @IsOptional()
  timestamp?: string

  @IsString()
  @IsOptional()
  videoId?: string

  @IsString()
  @IsOptional()
  userId?: string

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
