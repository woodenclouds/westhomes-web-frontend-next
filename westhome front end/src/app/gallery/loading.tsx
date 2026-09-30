import { LoadingSkeleton } from "@/components/ui/States";

export default function GalleryLoading() {
  return (
    <div className="container-page py-16">
      <div className="mb-8 h-12 w-40 animate-pulse rounded bg-stone-deep" />
      <LoadingSkeleton rows={3} />
    </div>
  );
}
