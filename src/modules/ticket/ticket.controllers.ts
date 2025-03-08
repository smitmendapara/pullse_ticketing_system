import { Controller, Post, Body, Get, Param, Patch, Delete, Query } from '@nestjs/common';
import { TicketService } from './ticket.services';
import { CreateTicketDto, UpdateTicketDto } from './ticket.dto';

export enum TicketStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

export enum TicketPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

@Controller('api/tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  createTicket(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.createTicket(createTicketDto);
  }

  async getTickets(
    @Query('status') status?: TicketStatus,
    @Query('priority') priority?: TicketPriority
  ) {
    return await this.ticketService.getTickets(status, priority);
  }

  @Get(':id')
  getTicket(@Param('id') id: string) {
    return this.ticketService.getTicket(id);
  }

  @Patch(':id')
  updateTicket(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.updateTicket(id, updateTicketDto);
  }

  @Delete(':id')
  deleteTicket(@Param('id') id: string) {
    return this.ticketService.deleteTicket(id);
  }
}
