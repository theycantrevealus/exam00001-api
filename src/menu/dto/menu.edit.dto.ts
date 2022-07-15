import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNumber } from "class-validator"

export class MenuEditDTO {
    @ApiProperty({
        uniqueItems: true,
        example: 'Menu Dashboard',
    })
    @IsString()
    name: string

    @ApiProperty({
        uniqueItems: true,
        example: 'Used for routing link',
    })
    @IsString()
    identifier: string

    @ApiProperty({
        uniqueItems: true,
        example: 'Icon class name',
    })
    @IsString()
    icon: string

    @ApiProperty({
        uniqueItems: true,
        minLength: 1,
        maxLength: 1,
        example: 'Y/N',
    })
    @IsString()
    show_on_menu: string

    @ApiProperty({
        uniqueItems: true,
        example: 'Order for displaying Number : Reg[0-9]',
    })
    @IsNumber()
    show_order: number

    @ApiProperty({
        uniqueItems: true,
        example: 'Menu Grouping Req[0-9]',
    })
    menu_group: any

    @ApiProperty({
        uniqueItems: true,
        required: false,
        example: 'Menu Remark',
    })
    @IsString()
    remark: string

    @ApiProperty({
        example: 'Another Menu ID as parent',
    })
    @IsNumber()
    parent: number

    @ApiProperty({
        example: 'Menu Level Tree',
        required: false
    })
    @IsNumber()
    level: number

    @ApiProperty({
        required: false,
        example: 'Menu Color Theme',
    })
    @IsNumber()
    group_color: string
}

export class MenuEditResponseDTO {
    @ApiProperty({ example: 201 })
    @IsNumber()
    status: number

    @ApiProperty({ example: 'Menu updated Successfully' })
    @IsString()
    message: string

    returning: any
}