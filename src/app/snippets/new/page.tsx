'use client';

import { useFormState } from 'react-dom';
import * as actions from '@/actions';
import Link from 'next/link';

export default function SnippetCreatePage() {
  const [formState, setFormState] = useFormState(actions.createSnippet, { message: '' });

  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <h1 className="text-xl font-bold capitalize">Create a Snippet</h1>
        <div className="flex gap-4">
          <Link href={'/'} className="p-2 border rounded">
            Cancel
          </Link>
        </div>
      </div>

      <form action={setFormState}>
        {/* <h1 className="text-xl font-bold my-3 pb-5">Create a Snippet</h1> */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <label htmlFor="title" className="w-12">
              Title
            </label>
            <input type="text" name="title" id="title" className="border rounded p-2 w-full" />
          </div>
          <div className="flex gap-4">
            <label htmlFor="code" className="w-12">
              Code
            </label>
            <textarea name="code" id="code" className="border rounded p-2 w-full" />
          </div>
          {formState.message && (
            <p className="my-2 p-2 border rounded bg-red-200 border-red-300 text-red-500">
              {formState.message}
            </p>
          )}

          <button type="submit" className="rounded p-2 bg-blue-200">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
