# AI Content Creation Agent System - Project Structure

## Directory Structure

```
ai_content_agent/
├── README.md
├── requirements.txt
├── .env.example
├── .gitignore
├── main.py
├── config/
│   ├── __init__.py
│   ├── settings.py
│   └── prompts.py
├── agents/
│   ├── __init__.py
│   ├── style_learner.py
│   ├── email_processor.py
│   ├── trends_monitor.py
│   └── blog_generator.py
├── services/
│   ├── __init__.py
│   ├── gmail_service.py
│   ├── github_service.py
│   ├── openai_service.py
│   └── tavily_service.py
├── utils/
│   ├── __init__.py
│   ├── content_processor.py
│   ├── pr_manager.py
│   └── logger.py
├── data/
│   ├── writing_samples/
│   ├── summaries/
│   └── blog_posts/
├── tests/
│   ├── __init__.py
│   ├── test_agents/
│   └── test_services/
├── .github/
│   └── workflows/
│       └── daily_automation.yml
└── deployment/
    ├── vercel.json
    └── railway.toml
```

## Key Components

### 1. Agents (Core AI Logic)
- **style_learner.py**: One-time analysis of writing samples to understand Mark's style
- **email_processor.py**: Processes "READ THIS" emails and creates summaries
- **trends_monitor.py**: Monitors AI trends via Tavily and creates summaries
- **blog_generator.py**: Generates blog post drafts from processed content

### 2. Services (External API Integration)
- **gmail_service.py**: Gmail API integration for email processing
- **github_service.py**: GitHub API integration for PR management
- **openai_service.py**: OpenAI API integration for content generation
- **tavily_service.py**: Tavily API integration for web search and media

### 3. Utils (Shared Functionality)
- **content_processor.py**: Content processing and formatting utilities
- **pr_manager.py**: PR creation and management logic
- **logger.py**: Logging and error handling

### 4. Configuration
- **settings.py**: Environment variables and configuration
- **prompts.py**: AI prompts for different content types

### 5. Data Storage
- **writing_samples/**: Mark's existing writing samples for style analysis
- **summaries/**: Generated summary documents
- **blog_posts/**: Generated blog post drafts

### 6. Automation
- **daily_automation.yml**: GitHub Actions workflow for daily execution

## Technology Stack

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **Scheduling**: GitHub Actions
- **Deployment**: Vercel (free tier) or Railway (free tier)

### AI Services
- **Content Generation**: OpenAI GPT-4
- **Web Search**: Tavily API
- **Style Analysis**: OpenAI GPT-4 with custom prompts

### External APIs
- **Email**: Gmail API
- **Version Control**: GitHub API
- **Content Enhancement**: Tavily API

### Development Tools
- **Environment**: Python virtual environment
- **Dependencies**: requirements.txt
- **Configuration**: Environment variables
- **Logging**: Standard Python logging

## Deployment Strategy

### Free Tier Approach
1. **Vercel**: Host FastAPI application with serverless functions
2. **GitHub Actions**: Daily automation triggers
3. **GitHub**: Repository storage and PR management
4. **Environment Variables**: Secure credential management

### Cost Optimization
- Minimal API calls with caching
- Efficient prompt engineering
- Batch processing where possible
- Free tier limits monitoring

## Development Workflow

### Phase 1: Foundation (Week 1-2)
1. Set up project structure and environment
2. Implement style learning agent
3. Basic email processing functionality
4. GitHub Actions workflow setup

### Phase 2: Core Features (Week 3-4)
1. AI trends monitoring
2. Blog post generation
3. PR automation
4. Content style optimization

### Phase 3: Polish & Deploy (Week 5-6)
1. Error handling and logging
2. Performance optimization
3. Deployment configuration
4. Testing and validation

This structure follows rapid prototyper guidelines for maximum speed and minimal complexity while maintaining scalability for future enhancements. 