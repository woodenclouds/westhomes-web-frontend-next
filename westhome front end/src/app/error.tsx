"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ui/States";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-page py-20">
      <ErrorState
        title="Something went wrong"
        description="We could not load this page from the CMS. Please try again."
        onRetry={reset}
      />
    </div>
  );
}
