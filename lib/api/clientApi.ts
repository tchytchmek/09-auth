const authToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
import type { Note, CreateNoteType } from "../../types/note";
import { nextApi } from "./api";
import { User } from "@/types/user";
interface NotesQuery {
  notes: Note[];
  totalPages: number;
}

interface CredentialsQuery {
  email: string;
  password: string;
}

interface CheckSessionRequest{
    sucess: boolean,
}
export async function fetchNotes(
  page: number,
  text: string,
  tag?: string,
): Promise<NotesQuery> {
  const { data } = await nextApi.get<NotesQuery>("/notes", {
    headers: {
      Authorization: `Bearer ${authToken}`,
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

export async function createNote({
  content,
  title,
  tag,
}: CreateNoteType): Promise<Note> {
  const { data } = await nextApi.post<Note>(
    "/notes",
    { content, title, tag },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await nextApi.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return data;
}

export async function fetchNotesById(id: string): Promise<Note> {
  const { data } = await nextApi.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return data;
}

export async function register({ email, password }: CredentialsQuery): Promise<User> {
  const { data } = await nextApi.post<User>(
    "/auth/register",
    { email, password },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
  return data;
}

export async function login({ email, password }: CredentialsQuery): Promise<User> {
  const { data } = await nextApi.post<User>(
    "/auth/login",
    { email, password },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
  return data;
}

export async function logout(): Promise<void> {
  await nextApi.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
}

export async function checkSession(): Promise<CheckSessionRequest> {
  const { data } = await nextApi.get<CheckSessionRequest>(
    "/auth/session",
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
  return data;
}


export async function getMe(): Promise<User> {
  const { data } = await nextApi.get<User>(
    "/users/me",
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
  return data;
}

export async function updateMe({ username }: { username: string }): Promise<User> {
  const { data } = await nextApi.patch<User>(
    "/users/me",
    { username },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
  return data;
}
