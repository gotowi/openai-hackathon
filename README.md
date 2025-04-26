# AI-Powered To-Do List

## Overview

Our application seamlessly integrates AI agents into everyday life through a simple yet powerful to-do list interface. The project demonstrates how AI can be practically applied to automate tasks and enhance productivity in daily routines.
## Technical Architecture

The system is built as a distributed application with three main components:

### 1. Web Application (`apps/web/`)
- Next.js-based frontend
- Provides intuitive to-do list interface
- Real-time task status updates
- See `apps/web/README.md` for setup instructions

### 2. Manager Worker (`workers/manager/`)
- Orchestrates task execution
- Manages AI agent coordination
- Handles task distribution and monitoring
- See `workers/manager/README.md` for setup instructions

### 3. Agents Server (`workers/server/`)
- Python-based AI agent implementation
- Processes and executes research tasks
- Integrates with OpenAI APIs
- See `workers/server/README.md` for setup instructions

## Technology Stack
- **Frontend**: Next.js
- **Backend**: Python
- **AI Integration**: OpenAI Responses API and OpenAI Agents SDK

## Getting Started

1. Clone the repository
2. Follow setup instructions in each component's README
3. Start the components in order:
   - Agents Server
   - Manager Worker
   - Web Application

## Future Development
The application is designed to be extensible, with potential for:
- Integration with various APIs and services
- Support for different types of automated tasks
- Enhanced AI capabilities
- Custom agent configurations
