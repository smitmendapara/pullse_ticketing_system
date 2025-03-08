import { sql } from '../../database';
import { Injectable } from '@nestjs/common';
import { CreateAgentDto, UpdateAgentDto } from '../../modules/agent/agent.dto';

@Injectable()
export class AgentService {
    async createAgent(createAgentDto: CreateAgentDto) {
        const { name, email } = createAgentDto;

        const result = await sql`
        INSERT INTO agents (name, email, created_at)
        VALUES (${name}, ${email}, NOW())
        RETURNING *;
        `;

        return {
            status: true,
            message: 'Agent has been created.',
            data: result[0] || null
        }
    }

    async getAgents() {
        const result = await sql`SELECT * FROM agents;`;

        return {
            status: true,
            message: 'Agents has been fetched.',
            data: result
        }
    }
}