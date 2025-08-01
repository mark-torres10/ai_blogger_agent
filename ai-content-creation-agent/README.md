# AI Content Creation Agent System

A Next.js TypeScript application that generates blog post drafts in Mark Torres's writing style.

## Project Overview

This system analyzes Mark's existing blog content to understand his writing style and generates new content that matches his voice and tone. The MVP consists of two phases:

- **Phase 1**: Foundation setup, style analysis, and basic UI
- **Phase 2**: OpenAI integration and content generation

## Features

- Style analysis of Mark's blog articles
- AI-powered content generation
- Responsive web interface
- Vercel deployment

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **AI Integration**: OpenAI API (Phase 2)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── page.tsx        # Home page
│   └── layout.tsx      # Root layout
├── components/         # React components
└── styles/            # Global styles
```

## Deployment

This project is deployed on Vercel. The live URL will be available once deployment is complete.

## License

Private project for Mark Torres.
