'use client';

import type { Snippet } from '@prisma/client';
import Link from 'next/link';
import Editor from '@monaco-editor/react';
import { useState } from 'react';
import * as actions from '@/actions';

interface SnippetEditFormProps {
  snippet: Snippet;
}
export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);

  const handleEditorChange = (value: string = '') => {
    setCode(value);
  };

  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);
  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <h1 className="text-xl font-bold capitalize">{snippet.title}</h1>
        <div className="flex gap-4">
          <form action={editSnippetAction}>
            <button type="submit" className="p-2 border rounded">
              Save
            </button>
          </form>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded">Delete</button>
          </form>
          <Link href={'/'} className="p-2 border rounded">
            Your Snippets
          </Link>
        </div>
      </div>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />
    </div>
  );
}
