import { NoteTag } from "@/types/note";
import { create } from "zustand";
import type { CreateNoteType } from "../../types/note";
import { persist } from 'zustand/middleware'
interface draftStore {
  draft: CreateNoteType;
  setDraft: (newNote: CreateNoteType) => void;
  clearDraft: () => void;
}

const initialDraft = {
  title: "",
  content: "",
  tag: "Todo" as NoteTag,
};

export const useDraftStore = create<draftStore>()(
persist(
    (set) => ({
    draft: initialDraft,
    setDraft: (newNote) => {
        set({draft: newNote})
    },
    clearDraft: () => {
        set({draft: initialDraft})
    }
  }),
  {
    name: 'note-draft',
    partialize: (state) => ({ draft: state.draft }),
  }
)
);

