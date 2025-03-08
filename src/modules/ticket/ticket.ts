import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TicketController } from './ticket.controllers';
import { TicketService } from './ticket.services';

@Module({
  imports: [],
  controllers: [TicketController],
  providers: [TicketService]
})

export class TicketModule {}