"use client";

import css from "./EditProfilePage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";
import { updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

export default function EditProfile() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const newUsername = formData.get("username") as string;
    try {
      const data = await updateMe({ username: newUsername });
      setUser({ ...user, username: newUsername });
      router.push("/profile");
    } catch (error) {}
  };

  const handleCancel = () => {
    router.push("/profile");
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar}
          alt={`${user.username}'s avatar`}
          width={120}
          height={120}
          className={css.avatar}
        />

        <form action={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              name="username"
              className={css.input}
              defaultValue={user.username}
              required
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
