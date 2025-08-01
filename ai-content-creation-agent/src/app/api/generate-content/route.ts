import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { STYLE_GUIDE } from '@/lib/style-guide';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Note: Default topics are defined in the frontend component

export async function POST(request: NextRequest) {
  try {
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    const { topic } = await request.json();
    
    // Use the provided topic
    const actualTopic = topic;
    
    if (!actualTopic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    // Use the imported style guide
    const styleGuide = STYLE_GUIDE;

    // Determine content type based on topic
    const getContentType = (topic: string): 'personal' | 'technical' | 'educational' => {
      const technicalKeywords = ['technology', 'engineering', 'code', 'programming', 'software', 'system', 'api', 'database', 'algorithm'];
      const educationalKeywords = ['learning', 'tutorial', 'guide', 'how to', 'education', 'teaching', 'documentation'];
      
      const lowerTopic = topic.toLowerCase();
      
      if (technicalKeywords.some(keyword => lowerTopic.includes(keyword))) {
        return 'technical';
      } else if (educationalKeywords.some(keyword => lowerTopic.includes(keyword))) {
        return 'educational';
      } else {
        return 'personal';
      }
    };

    const contentType = getContentType(actualTopic);

    // Create the prompt for content generation
    const prompt = `You are Mark Torres, a mature, reflective professional who combines authentic vulnerability with practical wisdom and technical expertise. You write in a thoughtful, growth-oriented, and genuinely generous voice - someone who has learned from experience and wants to share insights with others.

${styleGuide}

Write THREE to FOUR paragraphs about "${actualTopic}" in Mark's authentic voice. The content should be ${contentType} in nature and follow these specific requirements:

1. **Voice Consistency**: Use authentic vulnerability, educational generosity, self-deprecating humor, cultural awareness, and practical wisdom
2. **Content Type Adaptation**: Adapt the style appropriately for ${contentType} content
3. **Structure**: Three to four paragraphs with natural flow between them
4. **Length**: Each paragraph should be substantial (3-5 sentences) but not overly long
5. **Authenticity**: Write as if Mark is genuinely sharing his thoughts and experiences
6. **Practical Value**: Provide actionable insights or wisdom that readers can apply
7. **Cultural Perspective**: Naturally incorporate Filipino-American identity and global awareness where relevant.
    BUT ONLY IF RELEVANT. FOR EXAMPLE, DO NOT GO OUT OF YOUR WAY TO WRITE CONTENT ABOUT BEING FILIPINO-AMERICAN. DO SO ONLY IF THE TOPIC NATURALLY LENDS ITSELF TO THE TOPIC.
8. **Self-Deprecating Humor**: You can include at least one instance of self-deprecating humor. BUT ONLY IF RELEVANT.
9. **Educational Intent**: Make it clear you want to help others learn from your experience
10. **Balanced Analysis**: Acknowledge complexity while taking clear, reasoned positions

Write the content directly without any meta-commentary or explanations. Start immediately with the first paragraph:`;

    // Generate content using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are Mark Torres, writing in his authentic voice. Follow the style guide exactly and write naturally as if you are Mark sharing his thoughts and experiences."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const generatedContent = completion.choices[0]?.message?.content;

    if (!generatedContent) {
      return NextResponse.json(
        { error: 'Failed to generate content' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      content: generatedContent,
      topic: actualTopic,
      contentType
    });

  } catch (error) {
    console.error('Content generation error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 