import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TicketModule } from './modules/ticket/ticket';
import { AgentModule } from './modules/agent/agent';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TicketModule,
    AgentModule
  ],
})
export class AppModule {}