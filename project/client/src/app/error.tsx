"use client";

type Props = {
  error: Error;
};

export default function ErrorBoundary({ error }: Readonly<Props>) {
  return <div>{error.message}</div>;
}
