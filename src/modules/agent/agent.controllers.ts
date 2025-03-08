import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AgentService } from '../../modules/agent//agent.services';
import { CreateAgentDto, UpdateAgentDto } from '../../modules/agent/agent.dto';

@Controller('api/agents')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post()
  createAgent(@Body() createAgentDto: CreateAgentDto) {
    return this.agentService.createAgent(createAgentDto);
  }

  @Get()
  getAgents() {
    return this.agentService.getAgents();
  }
}