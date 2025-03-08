import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column({ type: 'enum', enum: ['open', 'in_progress', 'resolved', 'closed'], default: 'open' })
  status!: 'open' | 'in_progress' | 'resolved' | 'closed';

  @Column({ type: 'enum', enum: ['low', 'medium', 'high', 'urgent'], default: 'low' })
  priority!: 'low' | 'medium' | 'high' | 'urgent';

  @Column({ nullable: true })
  assigned_to!: string | null;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
