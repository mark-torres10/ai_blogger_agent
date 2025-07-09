# AI Blogging Agent: Implementation Specification (V2)

This document outlines a robust, step-by-step implementation plan for the AI Blogging Agent. Each step is designed as a self-contained Pull Request (PR) delivering production-ready functionality.

## Core Technologies

*   **Orchestration:** LangChain & LangGraph
*   **Observability:** LangFuse
*   **News Source:** News API
*   **Web Search:** Tavily API
*   **Configuration:** Pydantic for settings management
*   **Deployment:** Docker & GitHub Actions

---

## PR 1: Project Scaffolding & Secure Configuration

*   **Description:** This foundational PR establishes the project structure, dependency management, and a secure, type-safe configuration system. It replaces insecure practices like loose environment variables with a robust settings management solution.
*   **Success Criteria:**
    *   A `pyproject.toml` file is created, managing all dependencies (`langchain`, `langgraph`, `langfuse`, `tavily-python`, `requests`, `pydantic`, `python-dotenv`).
    *   A `src` directory is created to house all application code.
    *   A `config.py` module using Pydantic loads settings from a `.env` file and environment variables, providing typed and validated configuration objects.
    *   The `.env` file is added to `.gitignore`.
    *   A `README.md` is initialized with setup instructions.
*   **Implementation Steps:**
    1.  Initialize the project with `poetry` or a similar tool to create `pyproject.toml`.
    2.  Add all necessary dependencies.
    3.  Create a `src/app` directory.
    4.  Inside `src/app`, create `config.py`. Define a `Settings` class using `pydantic.BaseSettings` to manage API keys (`NEWS_API_KEY`, `TAVILY_API_KEY`, `LANGFUSE_SECRET_KEY`, `LANGFUSE_PUBLIC_KEY`, `OPENAI_API_KEY`) and other configurations.
    5.  Create a `.env.example` file to show the required variables.
*   **Testing:**
    *   Write a unit test for `config.py` to ensure it correctly loads settings from a dummy `.env` file and environment variables.
    *   Assert that missing required variables raise a validation error.

---

## PR 2: Resilient Tooling for Data Ingestion

*   **Description:** This PR introduces resilient, observable "tools" for fetching data. It wraps API calls in error handling and integrates LangFuse for tracing. This replaces the simple, fragile script from the initial spec.
*   **Success Criteria:**
    *   Two functions, `fetch_news` and `search_web`, are created as LangChain `BaseTool`s.
    *   Each tool integrates the `@traceable` decorator from LangFuse for observability.
    *   The tools implement retry logic (e.g., with `tenacity`) and handle API/network errors gracefully.
    *   The tools return structured data objects (e.g., Pydantic models) instead of raw dictionaries.
*   **Implementation Steps:**
    1.  Create a `src/app/tools` directory.
    2.  Implement `news_tool.py` with a `FetchNewsTool` class. The `_run` method will contain the News API call logic.
    3.  Implement `search_tool.py` with a `TavilySearchTool` class. The `_run` method will use the Tavily Python SDK.
    4.  Add `tenacity` to `pyproject.toml` and use its `@retry` decorator on the API call methods within the tools.
    5.  Define Pydantic models for the output of each tool (e.g., `Article`, `SearchResult`).
*   **Testing:**
    *   Unit test each tool by mocking its external API dependency (e.g., using `unittest.mock.patch`).
    *   Test the retry mechanism by mocking a failing API call.
    *   Test the error handling by simulating API errors and asserting that the tool returns a graceful failure message or raises a specific exception.

---

## PR 3: Core AI Logic with LangGraph & LangFuse

*   **Description:** This PR implements the core content generation logic using a LangGraph `Agent` or `graph`. This modular approach allows for clear separation of concerns, easy extension, and deep observability through LangFuse. It uses the latest LangChain "Assistant" or "Agent" patterns.
*   **Success Criteria:**
    *   A LangGraph graph is defined that orchestrates the flow: `fetch_news` -> `summarize` -> `search_web` (for enrichment) -> `draft_blog`.
    *   Each node in the graph is a traceable function.
    *   The entire graph execution is traced in LangFuse, showing inputs, outputs, and latency for each step.
    *   Prompts are managed via the `langchain.prompts.ChatPromptTemplate` and loaded from a separate `prompts` directory.
*   **Implementation Steps:**
    1.  Create a `src/app/prompts` directory and define prompts for summarization and blog drafting in separate files (e.g., `summarizer.prompt`, `drafter.prompt`).
    2.  Create `src/app/agent.py`.
    3.  Initialize the LangFuse handler: `handler = LlamaIndexCallbackHandler()`.
    4.  Define the state object for the graph (e.g., a `TypedDict` containing articles, summary, search results, and the final draft).
    5.  Create the nodes as functions that take the state and return a partial state update.
    6.  Wire the nodes together in a `langgraph.graph.StateGraph`.
    7.  The main application entry point will now compile and invoke this graph, passing the LangFuse callback handler.
*   **Testing:**
    *   Write an integration test for the graph. Mock the tools (`FetchNewsTool`, `TavilySearchTool`) to return fixed data.
    *   Invoke the graph and assert that the final state contains a non-empty summary and draft.
    *   Manually inspect the LangFuse UI to confirm that traces are being created correctly.

---

## PR 4: Robust Email Delivery & CLI

*   **Description:** This PR adds a reliable email delivery service and a user-friendly CLI using `typer`.
*   **Success Criteria:**
    *   An `EmailService` class is created, abstracting the `smtplib` logic.
    *   The service is configurable via the Pydantic `Settings` object.
    *   A CLI is created using `typer` that allows for manual runs, specifying topics, and dry runs (printing to console instead of emailing).
*   **Implementation Steps:**
    1.  Add `typer` to `pyproject.toml`.
    2.  Create `src/app/services/email_service.py`.
    3.  Create `src/app/cli.py`. Define commands like `run-daily-briefing` with options like `--topic`, `--recipient-email`, and `--dry-run`.
    4.  The CLI will import and invoke the LangGraph agent from `agent.py`.
*   **Testing:**
    *   Unit test the `EmailService` by mocking `smtplib`.
    *   Write CLI tests using `typer.testing.CliRunner` to invoke commands and assert on the output and exit codes.

---

## PR 5: Production-Ready Deployment with Docker & GitHub Actions

*   **Description:** This PR containerizes the application with Docker and sets up a GitHub Actions workflow for automated daily execution. This is a significant improvement over a brittle cron job.
*   **Success Criteria:**
    *   A `Dockerfile` exists that creates a lean, production-ready image of the application.
    *   A GitHub Actions workflow is defined in `.github/workflows/daily-briefing.yml`.
    *   The workflow runs on a daily schedule (`schedule: cron`).
    *   The workflow securely provides secrets (API keys, etc.) to the Docker container as environment variables.
*   **Implementation Steps:**
    1.  Write a multi-stage `Dockerfile`. The first stage installs dependencies, and the final stage copies the `src` directory and sets the `CMD` to run the CLI command.
    2.  Create the `.github/workflows/daily-briefing.yml` file.
    3.  Use a `schedule` trigger.
    4.  Define jobs to build the Docker image and run it.
    5.  Use GitHub repository secrets to store all API keys and pass them to the Docker container using the `secrets` context.
*   **Testing:**
    *   Manually trigger the GitHub Actions workflow (`workflow_dispatch`) and verify that it completes successfully and an email is received.
    *   Build the Docker image locally and run it, testing the CLI commands.