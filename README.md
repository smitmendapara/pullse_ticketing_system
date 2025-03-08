# pullse_ticketing_system

# Ticket Management System

## Overview
This project is a Ticket Management System built with NestJS and Supabase(PostgreSQL), featuring real-time updates using Ably. It allows users to create, update, and manage tickets while also handling agent management.

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- Node.js (18.20.3)

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd ticket-management-system
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file and add the required environment variables:
   ```env
   DATABASE_URL=postgresql://postgres:<password>@<host>:<port>/<database>
   ABLY_API_KEY=<your-ably-api-key>
   SUPABASE_SERVICE_KEY=<your-supabase-service-key>
   PORT=<your-port>
   ```

4. Start the application:
   ```sh
   npm run prod
   ```

---
## API Documentation

### Ticket APIs

#### 1. Create a Ticket
**Endpoint:** `POST /api/tickets`

**Request Body:**
```json
{
  "title": "Issue with login",
  "description": "User unable to log in to the platform",
  "priority": "high",
  "status": "open",
  "assigned_to": "agent-uuid"
}
```

**Response:**
```json
{
  "status": true,
  "message": "Ticket has been created.",
  "data": { ...ticket_data }
}
```

#### 2. List Tickets
**Endpoint:** `GET /api/tickets`

**Query Parameters (optional):**
- `status`: Filter by ticket status (`open`, `in_progress`, `resolved`, `closed`)
- `priority`: Filter by ticket priority (`low`, `medium`, `high`, `urgent`)

**Response:**
```json
{
  "status": true,
  "message": "Tickets have been fetched.",
  "data": { "records": [ ...tickets ] }
}
```

#### 3. Update a Ticket
**Endpoint:** `PATCH /api/tickets/:id`

**Request Body:**
```json
{
  "status": "in_progress",
  "priority": "urgent",
  "assigned_to": "agent-uuid"
}
```

**Real-Time Update:** When a ticket status changes, an event is published to the `tickets-updates` channel using Ably.

**Response:**
```json
{
  "status": true,
  "message": "Ticket has been updated.",
  "data": { ...updated_ticket }
}
```

#### 4. Delete a Ticket
**Endpoint:** `DELETE /api/tickets/:id`

**Response:**
```json
{
  "status": true,
  "message": "Ticket has been deleted."
}
```

---
## Agent APIs

#### 1. Create an Agent
**Endpoint:** `POST /api/agents`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

**Response:**
```json
{
  "status": true,
  "message": "Agent has been created.",
  "data": { ...agent_data }
}
```

#### 2. List Agents
**Endpoint:** `GET /api/agents`

**Response:**
```json
{
  "status": true,
  "message": "Agents have been fetched.",
  "data": { "records": [ ...agents ] }
}
```

---
## Design Decisions & Challenges

### 1. Why PostgreSQL?
PostgreSQL was chosen for its strong ACID compliance, JSONB support, and ability to handle complex queries efficiently.

### 2. Why NestJS?
NestJS was used because of its modular structure, dependency injection, and built-in support for WebSockets and real-time features.

### 3. Handling Real-Time Updates
Ably was integrated to provide real-time updates whenever a ticket's status changes. This ensures that users receive instant updates.

### 4. Error Handling
Proper error handling is implemented using HTTP exceptions, ensuring consistent API responses and better debugging.

