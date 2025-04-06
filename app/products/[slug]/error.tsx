"use client";

export default function Error({ error }: { error: Error }) {
  return <div>Error loading product: {error.message}</div>;
}
