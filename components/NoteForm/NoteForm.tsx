"use client";

import css from "./NoteForm.module.css";
import type { NoteTag } from "../../types/note";
import { createNote } from "../../lib/api/clientApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDraftStore } from "@/lib/store/noteStore";

// interface FormValueProps {
//   title: string;
//   content: string;
//   tag: NoteTag;
// }
export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useDraftStore();
  //MUTATIONS
  const queryClient = useQueryClient();
  
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const { mutate: postMutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push("/notes/filter/all");
      clearDraft();
    },
    onError: () => {},
  });
  // const handleSubmit = (
  //   values: FormValueProps,
  // ) => {
  //   postMutate({
  //     title: values.title,
  //     content: values.content,
  //     tag: values.tag,
  //   });
  // };

  const handleSubmit = (formData: FormData) => {
    postMutate({
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as NoteTag,
    });
  };
  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          onChange={handleChange}
          value={draft.title}
          id="title"
          type="text"
          name="title"
          className={css.input}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          onChange={handleChange}
          value={draft.content}
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          onChange={handleChange}
          value={draft.tag}
          id="tag"
          name="tag"
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={() => router.back()}
          className={css.cancelButton}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
}
