import { Injectable } from '@nestjs/common';
import { sql } from '../../database';
import { CreateTicketDto, UpdateTicketDto } from '../../modules/ticket/ticket.dto';
import Ably from 'ably';

const ably = new Ably.Realtime(process.env.ABLY_API_KEY || '');

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

@Injectable()
export class TicketService {
  async createTicket(createTicketDto: CreateTicketDto) {
    const { title, description, status, priority, assigned_to } = createTicketDto;

    const result = await sql<{
      id: string;
      title: string;
      description: string;
      status: TicketStatus;
      priority: TicketPriority;
      assigned_to: string | null;
      created_at: Date;
      updated_at: Date;
    }[]>`
      INSERT INTO tickets (title, description, status, priority, assigned_to, created_at, updated_at)
      VALUES (${title}, ${description}, ${status ?? 'open'}, ${priority ?? 'low'}, ${assigned_to ?? null}, NOW(), NOW())
      RETURNING *;
    `;

    return result[0];
  }

  async getTickets(status?: TicketStatus, priority?: TicketPriority) {
    let query = sql`SELECT * FROM tickets`;

    if (status && priority) {
      query = sql`
        ${query} AND status = ${status} AND priority = ${priority}
      `;
    } else if (status) {
      query = sql`
        ${query} AND status = ${status}
      `;
    } else if (priority) {
      query = sql`
        ${query} AND priority = ${priority}
      `;
    }

    const tickets = await query;
    return tickets;
  }

  async getTicket(id: string) {
    const result = await sql`SELECT * FROM tickets WHERE id = ${id};`;
    return result[0] || null;
  }

  async updateTicket(id: string, updateTicketDto: UpdateTicketDto) {
    const { status, priority, assigned_to } = updateTicketDto;

    const safeStatus = status ? status.toString() : null;
    const safePriority = priority ? priority.toString() : null;
    const safeAssignedTo = assigned_to || null;

    const existingTicket = await sql`SELECT status FROM tickets WHERE id = ${id}`;
    if (!existingTicket.length) {
      throw new Error('Ticket not found');
    }

    const result = await sql`
      UPDATE tickets
      SET
        status = COALESCE(${safeStatus}, status),
        priority = COALESCE(${safePriority}, priority),
        assigned_to = COALESCE(${safeAssignedTo}, assigned_to),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *;
    `;

    if (result.length > 0) {
      const updatedTicket = result[0];
      if (safeStatus && safeStatus !== existingTicket[0].status) {
          const channel = ably.channels.get('tickets-updates');
          channel.publish('ticket-updated', {
            ticketId: id,
            status: safeStatus
          });
        }
      return updatedTicket;
    }
    return null;
    }

  

  async deleteTicket(id: string) {
    await sql`DELETE FROM tickets WHERE id = ${id};`;
    return { message: 'Ticket deleted successfully' };
  }
}

