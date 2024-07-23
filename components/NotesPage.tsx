'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { ModeToggle } from './mode-toggle';

interface NotesRendererProps {
  notes: string;
}

const NotesRenderer: React.FC<NotesRendererProps> = ({ notes }) => {
  const { theme } = useTheme();

  return (
    <div className="mt-4">
      {notes && (
        <>
          <div className="flex items-center justify-between mb-2">
            <h2 className={`text-xl pl-6 pb-2 m-2 font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>YT Digest</h2>
            <div className="flex items-center mx-6 mb-2">
              <ModeToggle />
              <Link href="/convert" className={`ml-4 px-4 py-2 rounded ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                Home
              </Link>
            </div>
          </div>
          <div className={`p-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-4" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-xl font-bold mb-3" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-lg font-bold mb-2" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4" {...props} />,
                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                a: ({ node, ...props }) => <a className="text-blue-500 hover:text-blue-700" {...props} />, // Blue theme for links
                code: ({ node, ...props }) => <code className="bg-gray-700 px-1 rounded" {...props} />,
                pre: ({ node, ...props }) => <pre className="bg-gray-700 p-2 rounded mb-4 overflow-x-auto" {...props} />,
              }}
            >
              {notes}
            </ReactMarkdown>
          </div>
        </>
      )}
    </div>
  );
};

export default NotesRenderer;
