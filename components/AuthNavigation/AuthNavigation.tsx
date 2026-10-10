import css from "./AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AuthNavigation() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const handleLogout = () => {
    clearIsAuthenticated();
    router.push("/sign-in");
  };
  return (
    <>
      {isAuthenticated && (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>

          <li className={css.navigationItem}>
            <p className={css.userEmail}>User email</p>
            <button
              onClick={handleLogout}
              type="button"
              className={css.logoutButton}
            >
              Logout
            </button>
          </li>
        </>
      )}
      {isAuthenticated! && (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
}
