import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Roboto } from "next/font/google";
import { Metadata } from "next";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const robo = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});
export const metadata: Metadata = {
  title: "NoteHub",
  description: "An application for creating notes",
  openGraph: {
    title: "NoteHub",
    description: "An application for creating notes",
    url: "https://08-zustand-lac-eta.vercel.app/",
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
export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={robo.variable}>
        <AuthProvider>
          <TanStackProvider>
            <Header />
            <main>
              {children}
              {modal}
            </main>
            <Footer />
          </TanStackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
