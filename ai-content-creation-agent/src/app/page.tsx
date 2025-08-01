'use client';

import { useState } from 'react';

// Default topics for the 4 buttons
const DEFAULT_TOPICS = [
  'Personal Growth and Learning',
  'Technology and Engineering',
  'Career Development',
  'Life Philosophy and Wisdom'
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
          topic: selectedTopic,
          customTopic: topic !== selectedTopic ? topic : undefined,
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
        return 'bg-blue-100 text-blue-800';
      case 'technical':
        return 'bg-green-100 text-green-800';
      case 'educational':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            AI Content Creation Agent
          </h1>
          <p className="text-xl text-gray-600">
            Generate blog content in Mark Torres&apos;s authentic voice
          </p>
        </div>

        {/* Default Topic Buttons */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Choose a Topic
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DEFAULT_TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => handleDefaultTopicClick(topic)}
                disabled={isLoading}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedTopic === topic
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="font-medium">{topic}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Topic Input */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Or Enter Your Own Topic
          </h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="Enter any topic you'd like to write about..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={handleCustomTopicSubmit}
              disabled={isLoading || !customTopic.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Generating content in Mark&apos;s voice...</p>
          </div>
        )}

        {/* Generated Content Display */}
        {generatedContent && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                  Generated Content
                </h2>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    Topic: <span className="font-medium">{generatedContent.topic}</span>
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getContentTypeColor(generatedContent.contentType)}`}>
                    {generatedContent.contentType}
                  </span>
                </div>
              </div>
              <button
                onClick={copyToClipboard}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  copySuccess
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {copySuccess ? 'Copied!' : 'Copy'}
              </button>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500">
                {generatedContent.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0 text-gray-800 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                This content was generated using Mark&apos;s personalized writing style guide, 
                incorporating authentic vulnerability, educational generosity, and cultural awareness.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>
            Powered by OpenAI GPT-4 • Style analysis by Mark Torres
          </p>
        </div>
      </div>
    </div>
  );
}
