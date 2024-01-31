import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/db';
import * as actions from '@/actions';

interface snippetsShowPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: snippetsShowPageProps) {
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(props.params.id) },
  });

  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <h1 className="text-xl font-bold capitalize">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link href={`/snippets/${snippet.id}/edit`} className="p-2 border rounded">
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded">Delete</button>
          </form>
          <Link href={'/'} className="p-2 border rounded">
            Your Snippets
          </Link>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

// this function will be called at build time and is used to cache the data in production
export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });
}
