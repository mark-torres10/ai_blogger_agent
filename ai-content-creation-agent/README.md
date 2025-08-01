# AI Content Creation Agent System

An AI-powered content generation system that creates blog posts in Mark Torres's authentic voice using OpenAI GPT-4 and a comprehensive personalized style guide.

## Features

### ✅ Implemented Features
- **AI Content Generation**: Generate two-paragraph articles using OpenAI GPT-4
- **Voice Replication**: Authentic replication of Mark's writing style using comprehensive style guide
- **Default Topics**: 4 pre-defined topic buttons for quick content generation
- **Custom Topics**: Input field for generating content on any topic
- **Content Type Detection**: Automatic classification as personal, technical, or educational content
- **Copy Functionality**: One-click copy of generated content to clipboard
- **Error Handling**: Graceful error handling for API failures and edge cases
- **Loading States**: Visual feedback during content generation
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

### 🎯 Core Capabilities
- **Authentic Voice**: Incorporates Mark's authentic vulnerability, educational generosity, and cultural awareness
- **Content Adaptation**: Adapts writing style based on content type (personal, technical, educational)
- **Self-Deprecating Humor**: Includes characteristic self-deprecating humor patterns
- **Cultural Perspective**: Naturally incorporates Filipino-American identity and global awareness
- **Practical Wisdom**: Focuses on actionable insights rather than theoretical discussion

## Technical Stack

- **Frontend**: Next.js 15 with TypeScript and React 19
- **Styling**: Tailwind CSS 4
- **AI Integration**: OpenAI GPT-4 API
- **Deployment**: Vercel-ready
- **Environment**: Node.js with npm

## Getting Started

### Prerequisites
- Node.js 18+ 
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-content-creation-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## Usage

### Default Topics
Click any of the 4 default topic buttons to generate content:
- Personal Growth and Learning
- Technology and Engineering  
- Career Development
- Life Philosophy and Wisdom

### Custom Topics
Enter any topic in the custom input field and click "Generate" to create content on that specific subject.

### Content Display
Generated content includes:
- Topic and content type classification
- Two-paragraph article in Mark's voice
- Copy button for easy content extraction
- Visual indicators for content type

## API Endpoints

### POST /api/generate-content
Generates content using OpenAI GPT-4 with Mark's style guide.

**Request Body:**
```json
{
  "topic": "string",
  "customTopic": "string (optional)"
}
```

**Response:**
```json
{
  "content": "string",
  "topic": "string", 
  "contentType": "personal" | "technical" | "educational"
}
```

## Style Guide Integration

The system uses Mark's comprehensive personalized style guide that includes:

### Core Voice Elements
- Authentic vulnerability and honest self-assessment
- Educational generosity and intent to help others
- Self-deprecating humor and approachable tone
- Cultural awareness and Filipino-American identity
- Practical wisdom and actionable insights

### Content Type Adaptations
- **Personal**: Higher vulnerability, cultural perspective, philosophical reflection
- **Technical**: Technical depth, data-driven approach, systematic methodology  
- **Educational**: Patient teaching tone, systematic progression, resource sharing

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── generate-content/
│   │       └── route.ts          # OpenAI API integration
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main UI component
├── style_analysis/               # Style analysis data
└── ...
```

## Development

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling

### Testing
```bash
npm run build  # Ensures code compiles and builds successfully
```

### Deployment
The application is ready for deployment on Vercel with automatic environment variable configuration.

## Success Criteria

- ✅ OpenAI API integration configured
- ✅ Content generation prompts using style guide implemented  
- ✅ Two-paragraph article generation functional
- ✅ Default topic buttons generate content
- ✅ Custom topic input generates content
- ✅ Content display component built
- ✅ Copy functionality implemented
- ✅ Error handling for API failures
- ✅ Content quality matches Mark's style
- ✅ All tests passing

## Voice Authenticity Features

The system successfully replicates Mark's authentic voice through:

1. **Authentic Vulnerability**: Shares genuine struggles and growth honestly
2. **Educational Generosity**: Clear intent to help others learn
3. **Cultural Awareness**: Natural incorporation of Filipino-American identity
4. **Self-Deprecating Humor**: Makes serious topics accessible and relatable
5. **Practical Focus**: Prioritizes actionable insights over theoretical discussion
6. **Balanced Analysis**: Acknowledges complexity while taking clear positions

## Future Enhancements

Potential improvements for future iterations:
- Content history and favorites
- Multiple content length options
- Style customization options
- Export to various formats
- Integration with blog platforms
- Content quality scoring
- Batch content generation

## Contributing

This project follows established coding standards and GitHub operations protocols. See the project documentation for detailed guidelines.

## License

This project is part of Mark Torres's AI content creation system.
