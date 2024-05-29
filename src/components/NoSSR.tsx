import dynamic from 'next/dynamic';

// toto je komponenta, ktera zajisti ze se komponenty nebudou renderovat na serveru
export const NoSsr = dynamic(() => Promise.resolve((props: any) => <>{props.children}</>), {
  ssr: false,
});