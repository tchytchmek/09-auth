"use client";

import css from "./ProfilePage.module.css";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { Metadata } from "next";

export async function generateMetadata() : Promise<Metadata>{
const { email, username, avatar } = useAuthStore(
      (state) => state.user,
    );
return {
   title: `${username}'s profile`,
   description: `${username}'s profile page`,
   openGraph: {
    title: `${username}'s profile`,
    description: `${username}'s profile page`,
    url: `https://09-auth-rho-rosy.vercel.app/profile`,
    images: [
      {
        url: `${avatar}`,
        width: 500,
        height: 300,
        alt: 'NoteHub',
      }
    ]
  },
}
}

export default function Profile() {
    const { email, username, avatar } = useAuthStore(
      (state) => state.user,
    );
    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link href="/profile/edit" className={css.editProfileButton}>
              Edit Profile
            </Link>
          </div>
          <div className={css.avatarWrapper}>
            <img
              src={avatar}
              alt={`${username}'s avatar`}
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
          <div className={css.profileInfo}>
            <p>{username}</p>
            <p>{email}</p>
          </div>
        </div>
      </main>
    );
}
