"use client";

type Props = {
  error: Error;
};

export default function GlobalErrorBoundary({ error }: Readonly<Props>) {
  return <div>{error.message}</div>;
}
