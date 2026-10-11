const authToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
import type { Note } from "../../types/note";
import { nextApi } from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";

interface NotesQuery {
  notes: Note[];
  totalPages: number;
}
export async function fetchNotes(
  page: number,
  text: string,
  tag?: string,
): Promise<NotesQuery> {
  const cookieStore = await cookies();

  const { data } = await nextApi.get<NotesQuery>("/notes", {
    headers: {
      Authorization: `Bearer ${authToken}`,
      Cookie: cookieStore.toString(),
    },
    params: {
      page: page,
      perPage: 12,
      search: text,
      tag: tag === "all" ? undefined : tag,
    },
  });
  return data;
}

export async function fetchNotesById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const { data } = await nextApi.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function checkSession() {
  const cookieStore = await cookies();
  const res = await nextApi.get("/auth/session", {
    headers: {
      Authorization: `Bearer ${authToken}`,
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}

export async function getMe() {
  const cookieStore = await cookies();
  const { data } = await nextApi.get<User>("/users/me", {
    headers: {
      Authorization: `Bearer ${authToken}`,
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
