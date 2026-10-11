"use client";

import { getMe, login } from "@/lib/api/clientApi";
import css from "./SignInPage.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { useAuthStore } from "@/lib/store/authStore";

export default function SignInPage() {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    setIsError(false);
    const userEmail = formData.get("email") as string;
    const userPassword = formData.get("password") as string;
    const queryObj = {
      email: userEmail,
      password: userPassword,
    };
    try {
      const res = await login(queryObj);
      if (res) {
        const user = await getMe();
        if (user) setUser(user);
        router.push("/profile");
      }
    } catch {
      setIsError(true);
    }
  };

  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {isError && (
          <p className={css.error}>
            <ErrorMessage />
          </p>
        )}
      </form>
    </main>
  );
}
//FOR COMMIT