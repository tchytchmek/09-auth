import { fetchNotes } from '@/lib/api/serverApi';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { Metadata } from "next";

interface NotesPageProps {
params: Promise<{ slug: string[] }>;
}

export async function generateMetadata( { params } : NotesPageProps ) : Promise<Metadata>{
const { slug } = await params;

return {
   title: `${slug[0]} notes`,
   description: `Filtered by ${slug[0]} notes`,
   openGraph: {
    title: `${slug[0]} notes`,
    description: `Filtered by ${slug[0]} notes`,
    url: `https://08-zustand-lac-eta.vercel.app/notes/filter/${slug[0]}`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 500,
        height: 300,
        alt: 'NoteHub',
      }
    ]
  },
}
}

export default async function NotesPage({ params }: NotesPageProps ){

    const { slug } = await params;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["notes", 1, '', slug[0]],
    queryFn: () => fetchNotes(1, '' , slug[0]),
    });
    return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={slug[0]} />
    </HydrationBoundary>
  );
}