import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "CreateNote",
  description: "Create notes on NoteHub",
  openGraph: {
    title: "CreateNote",
    description: "Create notes on NoteHub",
    url: "https://08-zustand-lac-eta.vercel.app/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 500,
        height: 300,
        alt: "NoteHub",
      },
    ],
  },
};
export default function CreateNote() {

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
