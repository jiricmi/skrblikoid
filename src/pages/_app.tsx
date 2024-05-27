import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import {NoSsr} from "@/components/NoSSR";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NoSsr>
      <Component {...pageProps} />
    </NoSsr>
  );
}

export default MyApp;