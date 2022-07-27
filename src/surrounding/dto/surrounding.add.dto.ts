import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber } from 'class-validator'

export class SurroundingAddDTO {
  @ApiProperty({
    uniqueItems: true,
    example: 'DOM',
  })
  @IsString()
  name: string

  @ApiProperty({
    example: 'xxx.xxx.xxx.xxx'
  })
  @IsString()
  ip: string
}

export class SurroundingAddDTOResponse {
  @ApiProperty({ example: 201 })
  @IsNumber()
  status: number

  @ApiProperty({ example: 'Surrounding Created Successfully' })
  @IsString()
  message: string

  returning: any
}
