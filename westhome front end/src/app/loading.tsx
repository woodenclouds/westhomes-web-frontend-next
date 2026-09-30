import { LoadingSkeleton } from "@/components/ui/States";

export default function Loading() {
  return (
    <div className="container-page py-16">
      <div className="mb-8 h-10 w-48 animate-pulse rounded bg-stone-deep" />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <LoadingSkeleton rows={3} />
      </div>
    </div>
  );
}
