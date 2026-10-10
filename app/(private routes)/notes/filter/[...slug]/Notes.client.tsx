'use client'

import css from "./Notes.module.css";
import { fetchNotes } from "@/lib/api/clientApi";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import { useDebounce } from "use-debounce";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";

interface NotesClientProps{
  tag: string,
}
function NotesClient({ tag } : NotesClientProps ) {
  const [currentPage, setCurrentPage] = useState(1);
  const [text, setText] = useState("");
  const [debouncedSearch] = useDebounce(text, 500);
  const router = useRouter();

  const { data, isError , isLoading } = useQuery({
    queryKey: ["notes", currentPage, debouncedSearch, tag],
    queryFn: () => fetchNotes(currentPage, debouncedSearch , tag),
    placeholderData: keepPreviousData,
  });
  const totalPages = data?.totalPages ?? 1;
  const notes = data?.notes ?? [];

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
    setCurrentPage(1);
  }

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={text} onChange={handleSearch} />
          {isError && <ErrorMessage/>}
          {isLoading && <Loader />}
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
          <button className={css.button} onClick={() => router.push('/notes/action/create')}>
            Create note +
          </button>
          
        </header>
        {data && <NoteList notes={notes} />}
      </div>
    </>
  );
}

export default NotesClient;
