import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AgentController } from './agent.controllers';
import { AgentService } from './agent.services';

@Module({
    imports: [],
    controllers: [AgentController],
    providers: [AgentService]
})

export class TicketModule {}