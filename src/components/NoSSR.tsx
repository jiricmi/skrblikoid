import dynamic from 'next/dynamic';

export const NoSsr = dynamic(() => Promise.resolve((props: any) => <>{props.children}</>), {
  ssr: false,
});