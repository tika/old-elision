import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Raleway } from "@next/font/google";

const font = Raleway({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={font.className}>
      <Component {...pageProps} />
    </main>
  );
}
