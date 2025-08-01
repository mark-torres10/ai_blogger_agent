'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Default topics for the 4 buttons
const DEFAULT_TOPICS = [
  'Personal Growth',
  'Technology',
  'Career',
  'Philosophy'
];

interface GeneratedContent {
  content: string;
  topic: string;
  contentType: 'personal' | 'technical' | 'educational';
}

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [customTopic, setCustomTopic] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const handleCustomTopicSubmit = async () => {
    if (!customTopic.trim()) {
      setError('Please enter a topic');
      return;
    }
    
    await generateContent(customTopic);
  };

  const handleDefaultTopicClick = async (topic: string) => {
    setSelectedTopic(topic);
    await generateContent(topic);
  };

  const generateContent = async (topic: string) => {
    setIsLoading(true);
    setError('');
    setGeneratedContent(null);
    setCopySuccess(false);

    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: topic,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate content');
      }

      const data = await response.json();
      setGeneratedContent(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!generatedContent) return;

    try {
      await navigator.clipboard.writeText(generatedContent.content);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      setError('Failed to copy to clipboard');
    }
  };

  const getContentTypeColor = (contentType: string) => {
    switch (contentType) {
      case 'personal':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'technical':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'educational':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            AI Content Creation Agent
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Generate blog content in Mark Torres&apos;s authentic voice using advanced AI and comprehensive style analysis
          </p>
        </div>

        {/* Main Content Area */}
        <div className="space-y-6">
          {/* Topic Selection Card */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800">Choose a Topic</CardTitle>
              <CardDescription>
                Select from popular topics or enter your own
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Default Topic Buttons - Single Row */}
              <div className="flex flex-wrap gap-3">
                {DEFAULT_TOPICS.map((topic) => (
                  <Button
                    key={topic}
                    variant={selectedTopic === topic ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleDefaultTopicClick(topic)}
                    disabled={isLoading}
                    className={`transition-all duration-200 ${
                      selectedTopic === topic 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    {topic}
                  </Button>
                ))}
              </div>

              {/* Custom Topic Input */}
              <div className="flex gap-3 pt-2">
                <Input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="Or enter any topic you'd like to write about..."
                  className="flex-1"
                  disabled={isLoading}
                  onKeyDown={(e) => e.key === 'Enter' && handleCustomTopicSubmit()}
                />
                <Button 
                  onClick={handleCustomTopicSubmit}
                  disabled={isLoading || !customTopic.trim()}
                  size="sm"
                >
                  Generate
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Error Display */}
          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-red-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Error:</span>
                  <span>{error}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Loading State */}
          {isLoading && (
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="inline-flex items-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-slate-600">Generating content in Mark&apos;s voice...</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Generated Content Display */}
          {generatedContent && (
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-slate-800 mb-2">
                      Generated Content
                    </CardTitle>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-500">
                        Topic: <span className="font-medium text-slate-700">{generatedContent.topic}</span>
                      </span>
                      <Badge variant="outline" className={getContentTypeColor(generatedContent.contentType)}>
                        {generatedContent.contentType}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    onClick={copyToClipboard}
                    variant={copySuccess ? "default" : "outline"}
                    size="sm"
                    className={copySuccess ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {copySuccess ? (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-blue-500">
                  {generatedContent.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0 text-slate-800 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-200">
                  <p className="text-sm text-slate-500">
                    This content was generated using Mark&apos;s personalized writing style guide, 
                    incorporating authentic vulnerability, educational generosity, and cultural awareness.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            Powered by OpenAI GPT-4o-mini • Style analysis by Mark Torres
          </p>
        </div>
      </div>
    </div>
  );
}
