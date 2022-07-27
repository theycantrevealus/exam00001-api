import { Controller, Post, Body, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from '../interceptor/logging';
import { Authorization } from '../decorator/auth.decorator';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { SurroundingService } from './surrounding.service';
import { SurroundingAddDTO } from './dto/surrounding.add.dto';

@Controller('surrounding')
@ApiTags('surrounding')
export class SurroundingController {
  constructor(private readonly surroundingService: SurroundingService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Authorization(true)
  @Post('add')
  @UseInterceptors(LoggingInterceptor)
  async add (@Body() data: SurroundingAddDTO) {
    return await this.surroundingService.add(data)
  }
}