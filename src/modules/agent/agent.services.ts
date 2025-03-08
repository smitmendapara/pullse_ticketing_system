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

        return result.length > 0 ? result[0] : null;
    }

    async getAgents() {
        const result = await sql`SELECT * FROM agents;`;
        return result;
    }

    async getAgent(id: string) {
        const result = await sql`SELECT * FROM agents WHERE id = ${id};`;
        return result.length > 0 ? result[0] : null;
    }
}